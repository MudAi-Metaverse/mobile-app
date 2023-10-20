import {ChatItemProps} from '@/comp/ChatItem';
import {useAccount} from 'wagmi';
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import {Config} from 'src/js/Config';
import {assets} from 'src/js/configView';
import {fetcher} from 'src/js/functions';
import {langAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';

const usePersonalized = () => {
  const {address} = useAccount();
  // const address = '0xE8F3BC920BEd1ffEa3a34A4C6C4EC8E36Ce43510';
  const lang = useRecoilValue(langAtom);

  const timeOut = 3000;
  const threshold = 30;

  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [num, setnum] = useState(1);
  const [answerNum, setanswerNum] = useState(0);
  const [question, setquestion] = useState('');
  const [maxNum, setmaxNum] = useState<number>();
  const [showCompleteModal, setshowCompleteModal] = useState(false);
  const [showAlert, setshowAlert] = useState(false);

  // 初回fetch
  useEffect(() => {
    fetcher(Config.COUNT_QUESTION_ENDPOINT, {})
      .then(res => res.json())
      .then(res => {
        setmaxNum(res.result);
      });
  }, []);

  useEffect(() => {
    if (!maxNum) {
      return;
    }

    if (num === maxNum + 1) {
      setisLoading(true);
      setshowCompleteModal(true);
    }
    setisLoading(true);
    getQuestion(maxNum);
  }, [num, maxNum]);

  const getQuestion = (maxNum: number) => {
    const body = {
      id: num,
      uid: address,
      language: lang,
    };

    fetcher(Config.QUESTION_ENDPOINT, body)
      .then(res => res.json())
      .then(res => {
        setquestion(res.question);
        if (res === false) {
          if (num < maxNum) {
            setnum(prev => prev + 1);
          } else {
            setshowCompleteModal(true);
          }
        } else {
          setlist(prev => {
            return [
              {
                type: 'other',
                img: assets.mudai,
                chat: res.question,
                read: true,
              },
              ...prev,
            ];
          });
          setisLoading(false);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const addChat = (value: string) => {
    setlist(prev => [{type: 'me', img: '', chat: value, read: true}, ...prev]);

    if (levelUpBorder.includes(num)) {
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false);
      }, timeOut);
    }

    fetcher(Config.ANSWER_ENDPOINT, {
      uid: address,
      id: num,
      question: question,
      answer: value,
    }).then(res => {
      setnum(prev => prev + 1);
      setanswerNum(prev => prev + 1);
    });
  };

  const onEndReached = () => {};

  return {
    list,
    addChat,
    onEndReached,
    isLoading,
    showAlert,
    showCompleteModal,
    setshowCompleteModal,
    answerNum,
  };
};

// const levelUpBorder = [0, 3, 8, 20, 35, 54, 78, 100];
const levelUpBorder = [0, 3, 10, 20, 35, 54, 78, 100];

export default usePersonalized;
