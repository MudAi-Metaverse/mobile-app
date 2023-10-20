import {useSetRecoilState, useResetRecoilState} from 'recoil';
import {
  navigationRefReadyAtom,
  chatGroupNameAtom,
  selectedGroupImageAtom,
  selectedUsersAtom,
} from 'src/recoil';

const useResetGroupState = () => {
  const resetGroupName = useResetRecoilState(chatGroupNameAtom);
  const resetSelectedImage = useResetRecoilState(selectedGroupImageAtom);
  const resetSelectedUsers = useResetRecoilState(selectedUsersAtom);

  const resetCreateGroupState = async () => {
    resetGroupName();
    resetSelectedUsers();
    resetSelectedImage();
  };

  return {resetCreateGroupState};
};

export default useResetGroupState;
