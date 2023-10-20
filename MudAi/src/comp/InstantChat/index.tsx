import React, {useEffect, useRef, useState} from 'react';
import {Center, HStack, Text, Box, VStack, Button} from 'native-base';
import {ChatItemProps} from 'src/comp/ChatItem';
import ChatWrapper from 'src/comp/ChatWrapper/ChatWrapper';
import {fetcher} from 'src/js/functions';
import {assets} from 'src/js/configView';
import {useAccount} from 'wagmi';
import {useRecoilValue} from 'recoil';
import {langAtom} from 'src/recoil';
import {Config} from 'src/js/Config';

type Props = {
  initialPrompt: string;
};

// type ChatProps = {
//   list: ChatItemProps[];
//   addChat: (e: FormEvent, value: string) => void;
//   isLoading: boolean;
//   listRef: RefObject<HTMLUListElement>;
// };

const InstantChat = (props: Props) => {
  const _langAtom = useRecoilValue(langAtom);

  const [isLoading, setisLoading] = useState(false);
  const [list, setlist] = useState<ChatItemProps[]>([
    {
      type: 'other',
      img: assets.mudai,
      chat: props.initialPrompt,
      read: true,
      unixtime: Math.floor(new Date().getTime() / 1000),
    },
  ]);
  const listRef = useRef(null);

  const {address} = useAccount();

  const genPrompt = () => {
    let prompt = '';
    list.forEach(item => {
      prompt += `${item.type !== 'me' ? 'You' : 'MyAI'}:${item.chat}\n`;
    });

    return prompt;
  };

  const addChat = (e: FormEvent, value: string) => {
    e.preventDefault();
    setisLoading(true);

    let prompt = genPrompt();
    prompt += `You: ${value}`;

    setlist(prev => {
      const clone = prev.slice().reverse();

      const newData = [
        ...clone,
        {
          type: 'other',
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
          type: 'me',
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
      language: _langAtom,
    };

    fetcher(Config.ASK_MY_AI_ENDPOINT, body)
      .then(res => {
        res.json();
      })
      .then(res => {
        setlist(prev => {
          const clone = [...prev];
          const lastItem: ChatItemProps = clone.shift();
          delete lastItem.typing;
          lastItem.chat = res.message.content.trim();
          lastItem.read = true;

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

  useEffect(() => {
    const prompt = genPrompt();

    const body = {
      uid: address,
      text: prompt,
      originalText: props.initialPrompt,
      language: _langAtom,
    };

    setlist(prev => [
      {
        type: 'me',
        img: assets.mudai,
        chat: '',
        typing: true,
        read: false,
        unixtime: Math.floor(new Date().getTime() / 1000),
      },
      ...prev,
    ]);

    fetcher(Config.ASK_MY_AI_ENDPOINT, body)
      .then(res => {
        return res.json();
      })
      .then(res => {
        setlist(prev => {
          const clone = [...prev];
          const lastItem: ChatItemProps = clone.shift();
          delete lastItem.typing;
          lastItem.chat = res.message.content.trim();
          lastItem.read = true;

          return [lastItem, ...clone];
        });
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <ChatWrapper
      list={list}
      addChat={addChat}
      isLoading={true}
      listRef={listRef}
      textAreaChildren={<></>}
    />
  );
};

export default InstantChat;
