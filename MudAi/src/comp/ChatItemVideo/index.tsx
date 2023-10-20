import React, {memo, useEffect, useRef, useState} from 'react';
import {Box, Text, Pressable, Center} from 'native-base';
import Video from 'react-native-video';
import ChatItemWrapper from 'src/comp/ChatItemWrapper';
import {secondsToMinutes} from 'src/js/functions';
import useMediaModal from 'src/pages/ChatRoom/MediaModal/useMediaModal';
import PlayingWave from 'src/comp/PlayingWave';
import useMediaUploading from 'src/pages/ChatRoom/useMediaUploading';
import SvgPlay from 'src/comp/svg/SvgPlay';
import {appStyles} from 'src/js/styles';
import {useRecoilState} from 'recoil';
import {viewableItemsAtom} from 'src/recoil';
import {useIsFocused} from '@react-navigation/native';
import convertToProxyURL from 'react-native-video-cache';
import FastImage from 'react-native-fast-image';
import {getLocalMediaFile} from 'src/pages/ChatRoom/functionsChatRoom';

export type ChatItemVideoProps = {
  type: 'other' | 'me';
  chat: string;
  img?: string;
  typing?: boolean;
  read: boolean;
  unixtime?: number;
  isViewable: boolean;
};

const ChatItemVideo = memo((props: ChatItemVideoProps) => {
  const videoRef = useRef();
  const [paused, setpaused] = useState(true);
  const [playbackRate, setplaybackRate] = useState(0);
  const {openMediaModal, activeMediaId} = useMediaModal();
  const {isUploading, progress, onLoadEnd} = useMediaUploading(props.mediaId);
  const [viewableItems, setviewableItems] = useRecoilState(viewableItemsAtom);
  const [isViewable, setisViewable] = useState(false);
  const isFocused = useIsFocused();
  const hasFile = getLocalMediaFile(props);

  useEffect(() => {
    if (activeMediaId) {
      setpaused(true);
    }
  }, [activeMediaId]);

  useEffect(() => {
    const tmp = viewableItems.some(obj => obj.item.mediaId === props.mediaId);
    setisViewable(tmp);
  }, [viewableItems]);

  useEffect(() => {
    // console.log('isViewable', isViewable);

    if (isViewable) {
      setpaused(false);
    } else {
      setpaused(true);
    }
  }, [isViewable]);

  useEffect(() => {
    if (!isFocused) {
      setpaused(true);
    }
  }, [isFocused]);

  useEffect(() => {
    if (paused) {
      videoRef.current?.seek(0);
      setplaybackRate(0);
    }
  }, [paused]);

  return (
    <ChatItemWrapper {...props}>
      <Box position="relative">
        {isUploading && (
          <Center
            position="absolute"
            w="100%"
            h="100%"
            bg="rgba(0,0,0,0.3)"
            zIndex="1">
            <Box
              w="80%"
              h="5px"
              borderRadius={'full'}
              borderWidth="1"
              bg="#fff">
              <Box
                w={`${progress}%`}
                h="100%"
                bg={appStyles.color.purpleMain}
              />
            </Box>
          </Center>
        )}
        <Pressable
          position="relative"
          onPress={() => {
            openMediaModal(props.mediaId);
          }}>
          <VideoLayer duration={props.duration} playbackRate={playbackRate} />
          {/* アップロード中 */}
          <Box width="100%" aspectRatio={props.width / props.height}>
            {hasFile && (
              <Video
                ref={videoRef}
                paused={true}
                style={{
                  display: isUploading ? 'flex' : 'none',
                  width: '100%',
                  aspectRatio: props.width / props.height,
                }}
                source={{uri: isFocused ? getLocalMediaFile(props) : null}}
                onError={e => {
                  console.log(e);
                }}
                onLoad={() => {
                  console.log('onloadend source', getLocalMediaFile(props));
                }}
                onSeek={() => {}}
              />
            )}

            {!isViewable && (
              <FastImage
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  display: isUploading ? 'none' : 'flex',
                  width: '100%',
                  height: '100%',
                }}
                source={{uri: props.poster}}
                // source={{uri: 'https://picsum.photos/id/237/200/300'}}
              />
            )}

            {/* downloadURLがあるとき */}
            {isViewable && (
              <Video
                ref={videoRef}
                paused={paused}
                style={{
                  display: isUploading ? 'none' : 'flex',
                  width: '100%',
                  aspectRatio: props.width / props.height,
                }}
                source={{
                  uri: props.media
                    ? convertToProxyURL(props.media)
                    : props.media,
                }}
                poster={props.poster}
                onLoad={data => {
                  if (isUploading) {
                    onLoadEnd();
                  }
                  // console.log('onloadend media', props.media);
                }}
                onPlaybackRateChange={e => {
                  setplaybackRate(e.playbackRate);
                }}
                onEnd={e => {
                  // ここでvideoRef.current.seek(0)を呼ぶとpausedが効かなくなる
                  setpaused(true);
                }}
                onError={e => {
                  console.log(e);
                }}
              />
            )}
          </Box>
        </Pressable>
      </Box>
    </ChatItemWrapper>
  );
});

const VideoLayer = props => {
  return (
    <Box position="absolute" top="0" left="0" w="100%" h="100%" zIndex={100}>
      {props?.playbackRate === 0 ? (
        <Box
          w="100%"
          h="100%"
          alignItems={'center'}
          justifyContent={'center'}
          bg="rgba(0,0,0,0.5)"
          gap="1">
          <Box w="6" h="6">
            <SvgPlay color="#fff" />
          </Box>
          <Text color="#fff">{secondsToMinutes(props.duration)}</Text>
        </Box>
      ) : (
        <Box
          w="100%"
          h="100%"
          p="2"
          alignItems={'flex-end'}
          justifyContent={'flex-end'}>
          <Box w="4" h="4">
            <PlayingWave />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatItemVideo;
