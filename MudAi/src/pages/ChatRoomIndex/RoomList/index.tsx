import React, {useCallback, memo} from 'react';
import ItemRoom from 'src/pages/ChatRoomIndex/RoomList/ItemRoom';
import {sortedRoomsSelector} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import ChatIndexList from 'src/comp/ChatIndexList';
import {useRenderInfo} from '@uidotdev/usehooks';

type Props = {
  listName: string;
};

const RoomList = memo((props: Props) => {
  const sortedRooms = useRecoilValue(sortedRoomsSelector);

  const renderItem = useCallback(({item}) => {
    return <ItemRoom room={item} />;
  }, []);

  const keyExtractor = useCallback(item => {
    return item.id;
  }, []);

  return (
    <ChatIndexList
      data={sortedRooms}
      renderItem={renderItem}
      handleKeyExtractor={keyExtractor}
      listName={'rooms'}
    />
  );
});

export default RoomList;
