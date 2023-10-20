// import {
//   appleAuth,
//   appleAuthAndroid,
// } from '@invertase/react-native-apple-authentication';
// import 'react-native-get-random-values';
import '@react-native-firebase/database';
import '@react-native-firebase/functions';
// import '@react-native-firebase/remote-config';
import '@react-native-firebase/storage';
import '@react-native-firebase/auth';

// import analytics from '@react-native-firebase/analytics';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// import functions from '@react-native-firebase/functions';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Platform} from 'react-native';

const app = firebase.app();
const authInstance = firebase.app().auth();
const functionsInstance = firebase.app().functions('asia-northeast1');
const firestoreInstance = firebase.app().firestore();
const databaseInstance = firebase.app().database();
const storageInstance = firebase.app().storage();

// if (process.env.NODE_ENV === 'development') {
//   const host = '192.168.10.6';
//   // const host = '192.168.0.102';
//   // const host = 'localhost';

//   functionsInstance.useEmulator(host, 5001);
//   authInstance.useEmulator(`http://${host}:9099`);
//   firestoreInstance.useEmulator(host, 8080);
//   databaseInstance.useEmulator(host, 9000);
//   storageInstance.useEmulator(host, 9199);
// }
// .useEmulator('192.168.10.3', 5001);
//   .useFunctionsEmulator('http://localhost:5001');

export function functionCall(functionPath, body) {
  return functionsInstance.httpsCallable(functionPath)(body);
}

export function writeDb(path, data) {
  return databaseInstance.ref(path).set(data);
}

export function updatesDb(updates) {
  return databaseInstance.ref().update(updates);
}

export function pushDb(path, data) {
  const newReference = databaseInstance.ref(path).push();
  newReference.update(data);
  return newReference;
}

export function deleteDb(path) {
  return databaseInstance.ref(path).remove();
}

export function listenDb(path, setterFuc) {
  return databaseInstance.ref(path).on('value', snapshot => {
    if (snapshot.val()) {
      setterFuc(snapshot.val());
    } else {
      setterFuc({});
    }
  });
}

export function chatListenDb(path, setterFuc) {
  return databaseInstance
    .ref(path)
    .orderByKey()
    .on('value', snapshot => {
      if (snapshot.val()) {
        setterFuc(snapshot.val());
      } else {
        setterFuc({});
      }
    });
}

export function queryListenDb(path, setterFuc, queryKey, queryValue) {
  return databaseInstance
    .ref(path)
    .orderByChild(queryKey)
    .equalTo(queryValue)
    .on('value', snapshot => {
      if (snapshot.val()) {
        setterFuc(snapshot.val());
      } else {
        setterFuc();
      }
    });
}

export function getDb(path, limit = 100) {
  const pathRef = databaseInstance.ref(path).orderByKey().limitToLast(limit);
  return pathRef
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        return snapshot.val();
      } else {
        return 0;
      }
    })
    .catch(e => {
      console.error(e);
    });
}

export function getDbFromA(path, lastUnix, mode, limit = 100) {
  let pathRef;
  if (mode === 'before') {
    pathRef = databaseInstance
      .ref(path)
      .orderByKey()
      .endAt(lastUnix)
      .limitToLast(limit);
  } else {
    pathRef = databaseInstance
      .ref(path)
      .orderByKey()
      .startAt(lastUnix)
      .limitToLast(limit);
  }

  return pathRef.once('value').then(snapshot => {
    if (snapshot.val()) {
      return snapshot.val();
    } else {
      return 0;
    }
  });
}

export function ListenDbFromA(path, setFunc, lastUnix, mode, limit = 100) {
  let pathRef;
  if (mode === 'before') {
    pathRef = databaseInstance
      .ref(path)
      .orderByKey()
      .endAt(lastUnix)
      .limitToLast(limit);
  } else {
    pathRef = databaseInstance
      .ref(path)
      .orderByKey()
      .startAt(lastUnix)
      .limitToLast(limit);
  }

  return pathRef.on('value', snapshot => {
    if (snapshot.val()) {
      return setFunc(snapshot.val());
    } else {
      return 0;
    }
  });
}

export function listenLimitDb(path, setterFuc, limit = 10, event = 'value') {
  return databaseInstance
    .ref(path)
    .limitToLast(limit)
    .on(event, snapshot => {
      if (snapshot) {
        setterFuc(snapshot.val());
      }
    });
}

export function listenLimitChatDb(path, setterFunc, startAt, limit = 10) {
  const ref = databaseInstance
    .ref(path)
    .orderByKey()
    .startAt(String(startAt))
    .limitToLast(limit);

  return ref.on('child_added', snapshot => {
    if (snapshot) {
      setterFunc(snapshot.val());
    }
  });
}

export function listenEventDb(path, setterFunc, event) {
  const ref = databaseInstance.ref(path);

  return ref.on(event, snapshot => {
    if (snapshot) {
      setterFunc(snapshot.val());
    }
  });
}

export function queryListenChatListDb(path, setterFuc, queryValue) {
  return databaseInstance
    .ref(path)
    .orderByChild(queryValue)
    .startAt(-1)
    .on('value', snapshot => {
      if (snapshot.val()) {
        setterFuc(snapshot.val());
      }
    });
}

export function offListenDb(path, onValueChange = null) {
  if (onValueChange) {
    databaseInstance.ref(path).off('value', onValueChange);
  } else {
    databaseInstance.ref(path).off('value');
  }
}

export function offListenChildAddDb(path, onValueChange = null) {
  if (onValueChange) {
    databaseInstance.ref(path).off('child_added', onValueChange);
  } else {
    databaseInstance.ref(path).off('child_added');
  }
}

export async function getStore(path) {
  return firestoreInstance
    .doc(path)
    .get()
    .then(documentSnapshot => {
      if (documentSnapshot.exists) {
        return documentSnapshot.data();
      } else {
        return {};
      }
    });
}

export function setStore(path, data) {
  return firestoreInstance.doc(path).set(data, {merge: true});
}

export function updateStore(path, data) {
  return firestoreInstance.doc(path).update(data);
}

export async function addUnionStore(path, key, data) {
  firestoreInstance.doc(path).update({
    [key]: firestore.FieldValue.arrayUnion(data),
  });
}

export async function removeUnionStore(path, key, data) {
  firestoreInstance.doc(path).update({
    [key]: firestore.FieldValue.arrayRemove(data),
  });
}

export async function orderByStore(
  path,
  orderKey,
  limitNum = 10,
  isdesc = false,
) {
  const collectionRef = firestoreInstance.collection(path);
  let q;
  if (isdesc) {
    q = collectionRef.orderBy(orderKey, 'desc').limit(limitNum);
  } else {
    q = collectionRef.orderBy(orderKey).limit(limitNum);
  }
  const querySnapshot = await q.get();
  const tmp = [];
  querySnapshot.forEach(queriedDoc => {
    tmp.push(queriedDoc.data());
  });
  return tmp;
}

export async function oneQueryStoreOrderby(
  path,
  key,
  ope,
  value,
  orderkey,
  limitNum = 1,
) {
  const collectionRef = firestoreInstance.collection(path);
  const q = collectionRef
    .where(key, ope, value)
    .orderBy(orderkey)
    .limit(limitNum);

  const querySnapshot = await q.get();
  const tmp = [];
  querySnapshot.forEach(queriedDoc => {
    tmp.push(queriedDoc.data());
  });
  return tmp;
}

export async function queryStore(
  path,
  key = '',
  ope = '',
  value = '',
  key2 = '',
  ope2 = '',
  value2 = '',
  limitNum = 10,
) {
  const collectionRef = firestoreInstance.collection(path);
  let q;
  if (key !== '') {
    if (key2 !== '') {
      q = collectionRef
        .where(key, ope, value)
        .where(key2, ope2, value2)
        .limit(limitNum);
    } else {
      q = collectionRef.where(key, ope, value).limit(limitNum);
    }
  } else {
    q = collectionRef.limit(limitNum);
  }
  const querySnapshot = await q.get();
  const tmp = [];
  querySnapshot.forEach(queriedDoc => {
    tmp.push(queriedDoc.data());
  });
  return tmp;
}

export async function doubleQueryStore(
  path,
  key,
  ope,
  value,
  key2,
  ope2,
  value2,
) {
  const collectionRef = firestoreInstance.collection(path);
  const q = collectionRef.where(key, ope, value).where(key2, ope2, value2);

  const querySnapshot = await q.get();
  const tmp = [];
  querySnapshot.forEach(queriedDoc => {
    tmp.push(queriedDoc.data());
  });
  return tmp;
}

export function queryListenStore(
  path,
  setFunc,
  key = '',
  ope = '',
  value = '',
) {
  const collectionRef = firestoreInstance.collection(path);
  let q;
  if (key !== '') {
    q = collectionRef.where(key, ope, value);
  } else {
    q = collectionRef;
  }
  // console.log('queryListenStore', {path, key, ope, value});

  const unsubscribe = q.onSnapshot(
    querySnapshot => {
      const tmp = [];
      querySnapshot.forEach(documentSnapshot => {
        tmp.push(documentSnapshot.data());
      });
      setFunc(tmp);
    },
    e => {
      console.error('queryListenStore error', e);
    },
  );
  return unsubscribe;
}

export async function deleteStore(path) {
  return firestoreInstance.doc(path).delete();
}

export async function incrementStore(path, key) {
  try {
    await firestoreInstance.doc(path).update({
      [key]: firestore.FieldValue.increment(1),
    });
  } catch (error) {
    firestoreInstance.doc(path).set({[key]: 1}, {merge: true});
  }
  return 1;
}

export function listenStore(path, setfixedUserInfo) {
  return firestoreInstance.doc(path).onSnapshot(documentSnapshot => {
    setfixedUserInfo(documentSnapshot?.data());
  });
}

export const errorHandler = (error, t = v => v) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return t('メールアドレスを確認してください');
    case 'auth/invalid-password':
      return t('パスワードは6文字以上の長さが必要です');
    case 'auth/wrong-password':
      return t('メールアドレスまたはパスワードが違います');

    case 'auth/user-not-found':
      return t('登録されていません');

    case 'auth/too-many-requests':
      return t('試行回数を超えました。時間を置いてください。');

    // register
    case 'auth/email-already-in-use':
      return t('すでに登録されています');
    case 'auth/email-already-exists':
      return t('すでに登録されています');

    case 'auth/weak-password':
      return t('パスワードは6文字以上にしてください');

    default:
      return t('失敗しました');
  }
};

export const getStorageUrl = path => {
  try {
    return storageInstance.ref(path).getDownloadURL();
  } catch (error) {
    return 0;
  }
};

export function getStorageBlob(path) {
  try {
    const urlRes = storageInstance.ref(path).getDownloadURL();
    return urlRes.then(url => {
      return fetch(url).then(res => {
        return res.text();
        // .then(res => res._data);
      });
    });
    // return res;
  } catch (error) {
    return 0;
  }
}

export const uploadingImage = async (
  storagePath,
  imageSource,
  taskFunc = () => {},
) => {
  // const filename = imageSource.substring(imageSource.lastIndexOf('/') + 1);
  const uploadUri =
    Platform.OS === 'ios' ? imageSource.replace('file://', '') : imageSource;
  const path = [];
  // const storagePath = `${basePath}/${filename}`;
  const task = storageInstance.ref(storagePath).putFile(uploadUri);
  task.on('state_changed', snapshot => {
    taskFunc(snapshot);
  });
  try {
    await task;
    const url = await storageInstance.ref(storagePath).getDownloadURL();
    path.push(url);
  } catch (e) {
    console.error(e);
    throw e;
  }
  return path;
};

/*---------------------------------

  auth

---------------------------------*/

export function logout() {
  return authInstance.signOut();
}

export function authListen(func) {
  return authInstance.onAuthStateChanged(func);
}

export function anonymousSignin() {
  return authInstance.signInAnonymously();
}
