import {Chat} from 'src/pages/Chat';
import {Image, Platform} from 'react-native';
import {assets} from 'src/js/configView';
import {
  deleteDb,
  functionCall,
  getDb,
  getStore,
  offListenChildAddDb,
  offListenDb,
  updatesDb,
  writeDb,
} from 'src/js/firebase';
import {TChatMedia, TChatRoomMeta} from 'src/type';

export const fetchLimit = 20;

export const allOffListenDb = route => {
  // console.log('-- allOffListenDb --');
  offListenDb(`chatRoom/${route.params.id}/users`);
  offListenChildAddDb(`chatRoom/${route.params.id}/chats`);
  offListenDb(`chatRoom/${route.params.id}/typing`);
};

type TChatRoomMetaOrg = Omit<TChatRoomMeta, 'createAt'>;
export const genRoom = async (
  roomId: string,
  memberAddressArr: string[],
  meta: Omit<TChatRoomMetaOrg, 'id'>,
) => {
  const path = `chatRoom/${roomId}`;
  const usersPath = `chatUsers/${roomId}`;
  const updates: {
    [key: string]: string | boolean;
  } = {};
  const updateArr: {
    key: string;
    value: string | boolean;
  }[] = [];

  memberAddressArr.forEach(address => {
    updateArr.push({
      key: `${path}/users/${address}/address`,
      value: address,
    });
    updateArr.push({
      key: `${usersPath}/${address}`,
      value: true,
    });
  });

  updateArr.forEach(item => {
    updates[item.key] = item.value;
  });

  await updatesDb(updates);
  await genChatRoomMeta(roomId, {
    id: roomId,
    ...meta,
  });

  return {
    id: roomId,
  };
};

export const genChatRoomMeta = (roomId: string, meta: TChatRoomMetaOrg) => {
  const path = `chatRoom/${roomId}/meta`;
  const data: TChatRoomMeta = {
    ...meta,
    createAt: new Date().getTime(),
  };
  return writeDb(path, data);
};

// ルームの自分以外のユーザーのアカウント情報を取得（プライベートチャット用）
export const getOtherUserInfo = async (roomUsers, myAddress) => {
  const otherUserAddress = roomUsers.filter(item => item !== myAddress)[0];
  return getStore(`user/${otherUserAddress}`).then(res => {
    return res;
  });
};

export const getOtherUserStoreArr = async (roomUsers, myAddress) => {
  const otherUserAddressArr = roomUsers.filter(item => item !== myAddress);
  getUserDetailArr;
  const promises = otherUserAddressArr.map(userAddress => {
    return getStore(`user/${userAddress}`).then(res => {
      return res;
    });
  });

  return Promise.all(promises).then(res => {
    return res;
  });
};

// ローカルの画像の場合はnumberをuriに変換する
// 画像のURLが無ければplaceholderをセットする
export const setImageSource = (imageUrl: string) => {
  let source;
  if (typeof imageUrl === 'number') {
    source = {uri: Image.resolveAssetSource(imageUrl).uri};
  } else if (imageUrl?.path) {
    source = {uri: imageUrl.path};
  } else if (imageUrl) {
    source = {uri: imageUrl};
  } else {
    source = assets.no_image;
  }

  return source;
};

/*---------------------------------

  一覧系

---------------------------------*/

export const checkPrivateRoomExist = (
  roomList,
  roomMetaArr,
  friendAddress: string,
) => {
  let roomId = null;

  roomList?.forEach(room => {
    const roomMeta = roomMetaArr.filter(meta => meta?.id === room.id)[0];

    if (
      roomMeta &&
      roomMeta.type !== 'group' &&
      room.users.some(item => item === friendAddress)
    ) {
      // ルームがある時はidを返す
      roomId = room.id;
    }
  });

  // ルームがない時はnull
  return roomId;
};

export const getOtherUserLastChat = async (myAddress, roomId) => {
  const otherUsers = getDb(`chatRoom/${roomId}/users`);
  delete otherUsers[address];

  return otherUsers;
};

export const genMemberSelectList = async (
  followList: string[],
  roomId: string = null,
) => {
  let excludeAddressArr: string[] = [];
  if (roomId) {
    excludeAddressArr = await getDb(`chatUsers/${roomId}`).then(res => {
      return Object.keys(res);
    });
  }

  const userDetailArr = await getUserDetailArr(
    followList.filter(
      address => !excludeAddressArr.find(item => item === address),
    ),
  );

  const sections = [
    {
      title: 'follow',
      data: userDetailArr,
    },
  ];

  return sections;
};

/*---------------------------------

  Room情報取得系

---------------------------------*/

export const genChatMetaPath = (roomId: string) => {
  return `chatRoom/${roomId}/meta`;
};

export const getRoomMeta = (roomId: string) => {
  return getDb(`chatRoom/${roomId}/meta`).catch(e => {
    console.error(e);
  });
};

export const getRoomName = async (roomMeta, myAddress, roomUsersObj) => {
  let title = '';
  if (roomMeta?.type === 'group') {
    title = `${roomMeta.name}（${Object.keys(roomUsersObj).length}）`;
  } else {
    const otherUser = Object.keys(roomUsersObj).filter(
      item => item !== myAddress,
    );
    const otherUserStoreArr = await getUserDetailArr(otherUser);
    title = otherUserStoreArr[0]?.name;
  }

  return title;
};

/*---------------------------------

  chatRoom操作

---------------------------------*/

export const addMemberChatRoom = (roomId: string, addressArr: string[]) => {
  const updates = {};
  addressArr.forEach(address => {
    updates[`chatRoom/${roomId}/users/${address}/address`] = address;
    updates[`chatRoom/${roomId}/users/${address}/lastChat`] = Date.now();
    updates[`chatUsers/${roomId}/${address}`] = true;
  });

  return updatesDb(updates);
};

export const leaveChatRoom = async (roomId: string, addressArr: string[]) => {
  const updates = {};
  addressArr.forEach(address => {
    updates[`chatRoom/${roomId}/users/${address}`] = null;
    updates[`chatUsers/${roomId}/${address}`] = null;
  });

  await updatesDb(updates);

  const users = await getDb(`chatUsers/${roomId}/`);

  if (!users) {
    await deleteChatRoom(roomId);
  }
};

export const deleteChatRoom = async roomId => {
  Promise.all([
    deleteDb(`chatRoom/${roomId}`),
    deleteDb(`chatUsers/${roomId}`),
  ]).then(res => {
    return res;
  });
};

/*---------------------------------

  room内

---------------------------------*/

export const getUserDetailArr = async (addressArr: string[]) => {
  const promises = addressArr.map(address => {
    return getStore(`user/${address}`);
  });

  return Promise.all(promises).then(res => {
    return res;
  });
};

export const createNotificationAdditionalInfo = (roomMeta, userStore) => {
  let title;
  let subtitle;
  // let image;

  if (roomMeta.type === 'group') {
    title =
      Platform.OS === 'ios'
        ? roomMeta.name
        : `${roomMeta.name}\n${userStore.name}`;
    subtitle = userStore.name;
    // image = roomMeta.img;
  } else {
    title = userStore.name;
    // image = userStore.img;
  }

  return {
    title,
    subtitle,
  };
};

export const addMedia = (
  roomId: string,
  media: TChatMedia,
  address: string,
  tokens: string[],
  roomMeta: TChatRoomMeta,
  userStore: any,
  unixtime?: number,
) => {
  const _unixtime = unixtime || new Date().getTime();
  const mode = String(media.mime).match(/video\//) ? 'video' : 'img';
  const videoProperty =
    mode === 'video' ? {duration: media.duration, poster: media.poster} : {};

  console.log('addMedia', media);

  const dbPath = `chatRoom/${roomId}/media/${media.id}`;
  writeDb(dbPath, {
    id: media.id,
    mime: media.mime,
    width: media.width,
    height: media.height,
    filename: media.filename,
    downloadUrl: media.downloadUrl,
    createAt: _unixtime,
    owner: address,
    ...videoProperty,
  });

  const chatPath = `chatRoom/${roomId}`;

  updatesDb({
    [`${chatPath}/chats/${_unixtime}`]: {
      address: address,
      unixtime: _unixtime,
      mode: mode,
      mediaId: media.id,
      media: media.downloadUrl,
      width: media.width,
      height: media.height,
      ...videoProperty,
    },
    [`${chatPath}/meta/lastChat`]: 'メディアを送信しました',
    [`${chatPath}/meta/unixtime`]: _unixtime,
  }).then(() => {
    console.log('addMedia done', 'success');
    const {title, subtitle} = createNotificationAdditionalInfo(
      roomMeta,
      userStore,
    );
    functionCall('notification_add_chat_asia', {
      notification: {
        title: title,
        body: 'メディアを送信しました',
        image: media.poster || media.downloadUrl,
      },
      tokens: tokens,
      data: {
        roomId: roomId,
        root: 'ChatRoom',
      },
      additionalInfo: {
        subtitle,
      },
    });
  });
};

export const getRoomTokens = async (roomId: string, address: string) => {
  const path = `chatRoom/${roomId}/users`;
  const users = await getDb(path);
  const userIds = Object.keys(users).filter(item => item !== address);
  // firestoreからuserの詳細情報を取得
  const promises = userIds.map(item => {
    const path = `user/${item}`;
    return getStore(path).then(res => {
      return res;
    });
  });

  // プッシュ通知のトークンをセット
  return Promise.all(promises).then(res => {
    const tokens = res
      .filter(user => user && user.tokens)
      .map(user => {
        return user.tokens;
      });

    const flatTokens = tokens.flat();
    return flatTokens;
  });
};

export const getUsersLastUnix = users => {
  const tmp = Object.keys(users).map(key => {
    return users[key].lastChat;
  });

  return tmp;
};

export const getLocalMediaFile = mediaObj => {
  return Platform.OS === 'ios' ? mediaObj.sourceURL : mediaObj.path;
};
