import React, {memo} from 'react';
import {followListAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import ChatUserList from 'src/comp/ChatUserList';

const FollowList = memo(() => {
  const followList = useRecoilValue(followListAtom);

  return <ChatUserList list={followList} listName="follow" />;
});

export default FollowList;
