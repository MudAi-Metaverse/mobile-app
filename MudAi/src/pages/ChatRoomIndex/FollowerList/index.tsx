import React, {memo} from 'react';
import {followListAtom, followerListAtom} from 'src/recoil';
import {useRecoilValue} from 'recoil';
import ChatUserList from 'src/comp/ChatUserList';

const FollowerList = memo(() => {
  const followList = useRecoilValue(followListAtom);
  const followerList = useRecoilValue(followerListAtom);

  // const filteredFollowerList = followerList.filter(follower => {
  //   return followList.every(follow => follow !== follower);
  // });

  return <ChatUserList list={followerList} listName="follower" />;
});

export default FollowerList;
