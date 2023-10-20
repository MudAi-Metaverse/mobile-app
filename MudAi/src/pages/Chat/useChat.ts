import {ChatItemProps} from '@/comp/ChatItem';
import {useAccount} from 'wagmi';
import React, {useState, useEffect, useRef} from 'react';
import {langAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import {Config} from 'src/js/Config';
import {assets} from 'src/js/configView';
import {fetcher} from 'src/js/functions';
import {TFixedPhrase} from 'src/pages/Chat/FixedPhrase';

const useChat = () => {
  const [list, setlist] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [hasNoResult, sethasNoResult] = useState(false);
  const listRef = useRef(null);
  const {address} = useAccount();
  const lang = useRecoilValue(langAtom);

  // カウント0でpersonalizedModal表示
  useEffect(() => {
    fetcher(Config.COUNT_PERSONALIZE_ENDPOINT, {
      uid: address,
    })
      .then(res => res.json())
      .then(res => {
        if (res.result === 0) {
          sethasNoResult(true);
        }
      });
  }, []);

  // 初回fetch
  useEffect(() => {
    fetchChat();
  }, []);

  // unixtimeから10件のchatを取得
  const fetchChat = (unixtime?: number) => {
    fetcher(Config.GET_HISTORY_ENDPOINT, {
      uid: address,
      unixtime: unixtime || Math.floor(new Date().getTime() / 1000),
    })
      .then(res => res.json())
      .then(res => {
        const chatArr: ChatItemProps[] = [];
        if (res.length === 0) {
          return;
        }

        res.forEach(item => {
          const {you, MudAi} = JSON.parse(item.chat);
          // console.log({ you, MudAi });

          chatArr.push({
            chat: MudAi,
            type: 'other',
            read: true,
            img: assets.mudai,
            unixtime: item.unixtime,
          });
          chatArr.push({
            chat: you,
            type: 'me',
            read: true,
            unixtime: item.unixtime,
          });
        });

        // rnではchatArrが後ろに追加される
        setlist(prev => {
          const result = [...prev, ...chatArr];

          return result;
        });
      });
  };

  const addChat = (value: string) => {
    setisLoading(true);

    let prompt = '';
    list.forEach(item => {
      prompt += `${item.type === 'me' ? 'You' : 'MyAI'}:${item.chat}\n`;
    });
    prompt += `You: ${value}`;

    setlist(prev => {
      const clone = prev.slice().reverse();

      const newData = [
        ...clone,
        {
          type: 'me',
          img: '',
          chat: value,
          read: true,
          unixtime: Math.floor(new Date().getTime() / 1000),
        },
      ];
      return newData.reverse();
    });

    setlist(prev => {
      const clone = prev.slice().reverse();

      const newData = [
        ...clone,
        {
          type: 'other',
          img: assets.mudai,
          chat: '',
          typing: true,
          read: false,
          unixtime: Math.floor(new Date().getTime() / 1000),
        },
      ];

      return newData.reverse();
    });

    const body = {
      uid: address,
      text: prompt,
      originalText: value,
      language: lang,
    };

    fetcher(Config.CHAT_ENDPOINT, body)
      .then(res => res.json())
      .then(res => {
        setlist(prev => {
          const clone = [...prev];
          const lastItem: ChatItemProps = clone.shift();
          delete lastItem.typing;
          lastItem.chat = res.message.content.trim();
          lastItem.read = true;

          // rnの場合はlastItemを先頭にする
          return [lastItem, ...clone];
        });
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const onEndReached = () => {
    if (list.length > 0) {
      console.log(list[list.length - 1].unixtime);
      fetchChat(list[list.length - 1].unixtime);
    }
  };

  const addFixedPhrase = (obj: TFixedPhrase) => {
    setlist(prev => [
      {
        type: 'me',
        img: '',
        chat: obj.question,
        read: true,
        unixtime: Math.floor(new Date().getTime() / 1000),
      },
      ...prev,
    ]);

    setlist(prev => [
      {
        type: 'other',
        img: assets.mudai,
        chat: obj.answer,
        read: true,
        unixtime: Math.floor(new Date().getTime() / 1000),
      },
      ...prev,
    ]);
  };

  return {
    list,
    listRef,
    addChat,
    onEndReached,
    isLoading,
    hasNoResult,
    sethasNoResult,
    addFixedPhrase,
  };
};

export default useChat;
