import {useAccount} from 'wagmi';
import {useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {getStore, queryStore} from 'src/js/firebase';

type TSearchResult = 'ready' | 'existUser' | 'noUser';
type TUserObj = {
  name: string;
  address: string;
  icon: string;
  id: string;
};

const useChatSearch = () => {
  const {address} = useAccount();
  const [searchResult, setsearchResult] = useState<TSearchResult>();
  const [userObj, setuserObj] = useState<TUserObj>();
  const [searchText, setsearchText] = useState('');
  const [isShowUserModal, setisShowUserModal] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (searchText.length === 0) {
      setsearchResult('ready');
      setuserObj(undefined);
      return;
    }

    // 自分のIDの時は検索しない
    if (searchText === address) {
      setsearchResult('noUser');
      setuserObj(undefined);
    } else {
      getStore(`user/${searchText}`).then(res => {
        if (Object.keys(res).length > 0) {
          setsearchResult('existUser');
          setuserObj(res);
          Keyboard.dismiss();
        } else {
          setsearchResult('noUser');
          setuserObj(undefined);
        }
      });
    }
  }, [searchText]);

  const onChangeSearchText = (text: string) => {
    // テキストが入力されてから0.5秒後に検索
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      timerId.current = null;
      setsearchText(text);
    }, 500);
  };

  const showUserModal = e => {
    setisShowUserModal(prev => !prev);
  };

  return {
    searchText,
    searchResult,
    userObj,
    onChangeSearchText,
    showUserModal,
    isShowUserModal,
  };
};

export default useChatSearch;
