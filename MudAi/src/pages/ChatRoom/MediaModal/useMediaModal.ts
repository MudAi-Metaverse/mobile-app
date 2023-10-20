import {activeMediaIdAtom} from 'src/recoil';
import {useRecoilState, useResetRecoilState} from 'recoil';

const useMediaModal = () => {
  const [activeMediaId, setActiveMediaId] = useRecoilState(activeMediaIdAtom);

  const openMediaModal = (mediaId: string) => {
    setActiveMediaId(mediaId);
  };

  return {
    openMediaModal,
    activeMediaId,
  };
};

export default useMediaModal;
