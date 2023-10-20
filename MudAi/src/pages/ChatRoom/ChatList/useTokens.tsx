import {useRoute} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {roomAddressesAtom, tokensRefAtom} from 'src/recoil';
import {useFocusEffect} from '@react-navigation/native';
import {useAccount} from 'wagmi';
import {getStore, listenDb} from 'src/js/firebase';
import useAppState from 'src/js/useAppState';

const useTokens = tokensRef => {
  const route = useRoute();
  const {address} = useAccount();
  const {appStateVisible} = useAppState();
  const settokensRef = useSetRecoilState(tokensRefAtom);
  const [otherUsersStoreInfo, setotherUsersStoreInfo] = useState(
    route?.params?.otherUserStoreArr,
  );
  const [otherUsers, setotherUsers] = useState({});
  const setroomAddressArr = useSetRecoilState(roomAddressesAtom);

  // 通知トークンの取得
  // ユーザーの既読状況のリッスン
  useFocusEffect(
    useCallback(() => {
      if (route.params?.id && appStateVisible === 'active') {
        const path = `chatRoom/${route.params.id}/users`;

        // ユーザーの既読状況のリッスン（自分とそれ以外を分ける）
        const _initialUsers = {...route.params.users};
        delete _initialUsers[address];
        setotherUsers(_initialUsers);
        setroomAddressArr(Object.keys(_initialUsers).map(address => address));
        // console.log('_initialUsers', _initialUsers);

        listenDb(path, v => {
          const users = v;
          setroomAddressArr(Object.keys(users).map(address => address));

          delete users[address];
          setotherUsers(users);

          // firestoreからuserの詳細情報を取得
          // プッシュ通知のトークンをセット
          const userIds = Object.keys(v).filter(item => item !== address);
          const promises = userIds.map(item => {
            const path = `user/${item}`;
            return getStore(path).then(res => {
              return res;
            });
          });

          Promise.all(promises).then(res => {
            setotherUsersStoreInfo(res);
            const tokens = res
              .filter(user => user && user.tokens)
              .map(user => {
                return user.tokens;
              });

            const flatTokens = tokens.flat();
            // console.log('flatTokens', flatTokens);

            tokensRef.current = flatTokens;
            settokensRef(flatTokens);
          });
        });
      }
    }, [route?.params?.id, appStateVisible]),
  );

  return {
    otherUsersStoreInfo,
    otherUsers,
  };
};

export default useTokens;
