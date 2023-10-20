import {useRecoilValue, useSetRecoilState} from 'recoil';
import {chatSoundAtom} from 'src/recoil';
import Sound from 'react-native-sound';
import {useEffect} from 'react';
import {assets} from 'src/js/configView';

const useAppSetup = () => {
  const setchatSound = useSetRecoilState(chatSoundAtom);

  useEffect(() => {
    const sound = new Sound(assets.chatSound, error => {
      if (error) {
        console.log('failed to load the sound.', error);
      }
    });

    setchatSound(sound);
  }, []);
};

export default useAppSetup;
