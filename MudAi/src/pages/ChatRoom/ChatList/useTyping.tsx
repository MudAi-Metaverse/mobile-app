import {useRoute} from '@react-navigation/native';
import {useCallback, useRef, useState} from 'react';

import {useFocusEffect} from '@react-navigation/native';
import {useAccount} from 'wagmi';
import {listenDb, offListenDb} from 'src/js/firebase';
import useAppState from 'src/js/useAppState';

const useTyping = (getUserImg, chat) => {
  const route = useRoute();
  const {address} = useAccount();
  const {appStateVisible} = useAppState();
  const [typingArr, settypingArr] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const path = `chatRoom/${route.params.id}/typing`;
      if (address && appStateVisible === 'active') {
        listenDb(path, v => {
          const typingArr = Object.keys(v)
            .map(userAddress => {
              return {
                chat: '',
                address: userAddress,
                typing: true,
                type: userAddress === address ? 'me' : 'other',
                img:
                  userAddress !== chat[0]?.address
                    ? getUserImg(userAddress)
                    : '',
              };
            })
            .filter(item => item.address !== address);

          settypingArr(typingArr);
        });
      }
      return () => {
        console.log('offListenDb', path);

        offListenDb(path);
      };
    }, [address, appStateVisible]),
  );

  return {
    typingArr,
  };
};

export default useTyping;
