export type TVoteChoice = {
  description: string;
  img: string;
  title: string;
};

export type TVote = {
  id: string;
  desciption: string;
  choices: TVoteChoice[];
  title: string;
  startAt: string;
  endAt: string;
  thumbnail: string;
};

export type TVoteHistory = {
  uid: string;
  choice: string;
  amount: number;
  unix: number;
};

/*---------------------------------

  firestore

---------------------------------*/

export type TFireStoreUser = {
  name: string;
  address: string;
  createAt: number;
  point: number;
  tokens: string[];
};

/*---------------------------------

  chat

---------------------------------*/

export type TRoomList = {
  id: string;
  users: string[];
};

export type TChatMedia = {
  id: string;
  mime: string;
  width: number;
  height: number;
  filename: string;
  downloadUrl: string;
  createAt: number;
  poster?: string;
};

export type TChatRoomMeta = {
  id: string;
  createAt: number;
  type: 'group' | 'private';
  name?: string;
  img?: string;
  imgBg?: string;
};
