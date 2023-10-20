import {chatTabbarHidden} from './index';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {TChatRoomMeta, TRoomList, TVote} from '@/type';
import {atom, atomFamily, selector, selectorFamily} from 'recoil';
import {findItemFromArr} from 'src/js/utils';

/*---------------------------------

  global

---------------------------------*/

export const remoteConfigAtomFamily = atomFamily<any, string>({
  key: 'global/remoteConfigAtomFamily',
  default: undefined,
});

export const chatSoundAtom = atom<any>({
  key: 'global/chatSound',
  default: undefined,
  dangerouslyAllowMutability: true,
});

/*---------------------------------

  navigation

---------------------------------*/

export const navigationRefReadyAtom = atom<boolean>({
  key: 'navigation/ready',
  default: false,
});

export const chatTabbarHiddenAtom = atom<boolean>({
  key: 'navigation/chatTabbarHidden',
  default: false,
});

/*---------------------------------

  auth

---------------------------------*/

export const authInfoAtom = atom<FirebaseAuthTypes.User | 'nodata' | undefined>(
  {
    key: 'auth/authInfo',
    default: undefined,
  },
);

/*---------------------------------

  wallet

---------------------------------*/

export const hasTokenAtom = atom<boolean>({
  key: 'wallet/hasToken',
  default: undefined,
});

/*---------------------------------

  project

---------------------------------*/

export const modeAtom = atom({
  key: 'mode',
  default: 'A',
});

export const langAtom = atom({
  key: 'common/lang',
  default: 0,
});

export const prevPathAtom = atom<string>({
  key: 'path/prev',
  default: undefined,
});

export const userAddressAtom = atom<string>({
  key: 'wallet/address',
  default: '',
});

export const userStoreAtom = atom({
  key: 'common/userStore',
  default: undefined,
  // dangerouslyAllowMutability: true,
});

export const tabbarHeightAtom = atom({
  key: 'common/tabbarHeight',
  default: undefined,
  // dangerouslyAllowMutability: true,
});

/*---------------------------------

  vote

---------------------------------*/

export const voteUserStoreAtom = atom<any | 'nodata' | undefined>({
  key: 'vote/userStore',
  default: undefined,
});

export const voteAtom = atom<TVote | undefined>({
  key: 'vote/vote',
  default: undefined,
});

export const voteChoiceIndexAtom = atom<number>({
  key: 'vote/choiceIndex',
  default: 0,
});

export const voteShowModalAtom = atom<boolean>({
  key: 'vote/showModal',
  default: false,
});

/*---------------------------------

  chatRoomIndex

---------------------------------*/

export const listHeightAtomFamily = atomFamily<number, string>({
  key: 'chat/listHeightAtomFamily',
  default: undefined,
});

export const listHeightSelectorFamily = selectorFamily<number[], string>({
  key: 'chat/listHeightSelectorFamily',
  get:
    () =>
    ({get}) => {
      const list = ['follow', 'follower', 'rooms'];
      return list.map(tab => {
        return {
          tab,
          height: get(listHeightAtomFamily(tab)),
        };
      });
    },
});

/*---------------------------------

  chatRoom

---------------------------------*/

export const roomIdAtom = atom<string>({
  key: 'chat/roomId',
  default: undefined,
});

export const initialRoomDataAtomFamily = atomFamily<any[], string>({
  key: 'chat/roomsData',
  default: undefined,
});

export const followListAtom = atom<string[]>({
  key: 'chat/follows',
  default: undefined,
});

export const followerListAtom = atom<any[]>({
  key: 'chat/followers',
  default: undefined,
});

export const userStoresAtomFamily = atomFamily<any, string>({
  key: 'chat/userStoresAtomFamily',
  default: undefined,
});

export const activeMediaIdAtom = atom<string>({
  key: 'chat/activeMediaId',
  default: undefined,
});

export const sheetShareActiveAtom = atom<boolean>({
  key: 'chat/sheetShareActive',
  default: false,
});

export const roomListAtom = atom<TRoomList[]>({
  key: 'chat/roomList',
  default: [],
});

export const roomMetaAtomFamily = atomFamily<TChatRoomMeta, string>({
  key: 'chat/roomMetaAtomFamily',
  default: undefined,
});

// export const roomInitialDataAtomFamily = atomFamily<any, string>({
//   key: 'chat/roomInitialDataAtomFamily',
//   default: undefined,
// });

export const roomMetaSelectorFamily = selectorFamily<TChatRoomMeta, string[]>({
  key: 'chat/roomMetaSelectorFamily',
  get:
    () =>
    ({get}) => {
      const roomList = get(roomListAtom);
      return roomList
        .map(room => get(roomMetaAtomFamily(room.id)))
        .filter(item => item);
    },
});

export const sortedRoomsSelector = selector({
  key: 'chat/sortedRooms',
  get: ({get}) => {
    const roomList = get(roomListAtom);
    const metaArr = get(roomMetaSelectorFamily());

    const sortedRooms = roomList.slice().sort((a, b) => {
      const metaA = findItemFromArr(metaArr, 'id', a.id);
      const metaB = findItemFromArr(metaArr, 'id', b.id);

      const aUnixtime = metaA?.unixtime || metaA?.createAt;
      const bUnixtime = metaB?.unixtime || metaB?.createAt;
      return bUnixtime - aUnixtime;
    });

    return sortedRooms;
  },
});

export const currentMediaAtom = atom<any>({
  key: 'chat/currentMedia',
  default: undefined,
});

// mediaUpload時の通知のため
export const tokensRefAtom = atom<string[]>({
  key: 'chat/tokensRef',
  default: undefined,
});

export const uploadingMediaFamily = atomFamily<any, string>({
  key: 'chat/uploadingMediaFamily',
  default: undefined,
});

export const mediaModalLoadingAtom = atom<boolean>({
  key: 'chat/mediaModalLoading',
  default: false,
});

export const viewableItemsAtom = atom<any[]>({
  key: 'chat/viewableItems',
  default: [],
});

export const chatRawDataAtom = atom<any[]>({
  key: 'chat/chatRawData',
  default: [],
});

export const roomAddressesAtom = atom<string[]>({
  key: 'chat/roomAddresses',
  default: [],
});

export const userProfileAtom = atom<{}>({
  key: 'chat/userProfile',
  default: undefined,
});

export const androidOpenPickerAtom = atom<boolean>({
  key: 'chat/androidOpenPicker',
  default: false,
});

/*---------------------------------

  chatGroup

---------------------------------*/

export const chatGroupNameAtom = atom<string>({
  key: 'chatGroup/chatGroupName',
  default: '',
});

export const selectedUsersAtom = atom<any[]>({
  key: 'chatGroup/selectedUsers',
  default: [],
});

export const selectedGroupImageAtom = atom<any[]>({
  key: 'chatGroup/selectedGroupImage',
  default: undefined,
});

/*---------------------------------

  edit group

---------------------------------*/
