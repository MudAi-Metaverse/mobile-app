import React, {useCallback} from 'react';
import {VStack} from 'native-base';
import ItemUser from 'src/pages/ChatRoomIndex/ItemUser';
import {roomListAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import ChatIndexList from 'src/comp/ChatIndexList';

type Props = {
  list: any[];
  listName: string;
};

const ChatUserList = (props: Props) => {
  const roomList = useRecoilValue(roomListAtom);
  const renderItem = useCallback(({item: userAddress}) => {
    return <ItemUser userAddress={userAddress} rooms={roomList} />;
  }, []);

  const handleKeyExtractor = useCallback(userAddress => userAddress, []);

  return (
    <ChatIndexList
      data={props.list}
      renderItem={renderItem}
      handleKeyExtractor={handleKeyExtractor}
      listName={props.listName}
    />
  );
};

export default ChatUserList;
