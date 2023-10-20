import {useRecoilCallback} from 'recoil';
import {roomMetaAtomFamily} from 'src/recoil';

const useChatRoomMeta = () => {
  const setMetaAtomFamily = useRecoilCallback(({set}) => (id, meta) => {
    set(roomMetaAtomFamily(id), meta);
  });

  return {
    setMetaAtomFamily,
    getMetaArr,
  };
};

export default useChatRoomMeta;
