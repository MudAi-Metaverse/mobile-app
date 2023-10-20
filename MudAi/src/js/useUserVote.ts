import {updateStore} from 'src/js/firebase';
import {useRecoilValue} from 'recoil';
import {userStoreAtom} from 'src/recoil';

const useUserVote = () => {
  const userStore = useRecoilValue(userStoreAtom);

  const addPoint = (point: number) => {
    updateStore(`user/${userStore.address}`, {
      point: userStore.point + point,
    });
  };

  const subtractPoint = (point: number) => {
    console.log({point, userStore});

    updateStore(`user/${userStore.address}`, {
      point: userStore.point - point,
    });
  };

  return {
    addPoint,
    subtractPoint,
  };
};

export default useUserVote;
