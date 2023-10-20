import {useRoute} from '@react-navigation/native';
// import {getStore, queryListenStore} from '@/js/firebase';
import {
  userAddressAtom,
  voteAtom,
  voteChoiceIndexAtom,
  voteUserStoreAtom,
} from 'src/recoil';
import {TVote} from '@/type';
import {Unsubscribe} from 'firebase/auth';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import {getStore, queryListenStore} from 'src/js/firebase';
import {useAccount} from 'wagmi';

const useVote = () => {
  const route = useRoute();
  const [vote, setvote] = useRecoilState(voteAtom);
  const [userStore, setuserStore] = useRecoilState(voteUserStoreAtom);
  const {address: userAddress} = useAccount();
  const [choiceIndex, setchoiceIndex] = useRecoilState(voteChoiceIndexAtom);

  useEffect(() => {
    if (route) {
      // voteのatomをセット
      getStore(`vote/${route.params.id}`).then(res => {
        setvote(res);
      });

      //　URLで直接選択肢ページに飛んだ場合
      // if (route.query.choice && choiceIndex !== Number(route.query.choice)) {
      //   setchoiceIndex(Number(router.query.choice));
      // }
    }
  }, [route]);

  useEffect(() => {
    let userStoreSubscriber: Unsubscribe | undefined;

    if (route && userAddress) {
      // 現在のユーザーの投票履歴を取得
      userStoreSubscriber = queryListenStore(
        `vote/${route.params.id}/history`,
        setuserStore,
        'uid',
        '==',
        userAddress,
      );
    }

    return () => {
      if (userStoreSubscriber) {
        userStoreSubscriber();
      }
    };
  }, [userAddress, route]);
};

export default useVote;
