import React, {memo, useEffect, useState} from 'react';
import {Box, Center, Pressable, Text} from 'native-base';
import FastImage from 'react-native-fast-image';
import ChatItemWrapper from 'src/comp/ChatItemWrapper';
import useMediaModal from 'src/pages/ChatRoom/MediaModal/useMediaModal';

import useMediaUploading from 'src/pages/ChatRoom/useMediaUploading';
import {appStyles} from 'src/js/styles';
import {Platform, StyleSheet} from 'react-native';
import {getLocalMediaFile} from 'src/pages/ChatRoom/functionsChatRoom';

export type ChatItemImgProps = {
  type: 'other' | 'me';
  chat: string;
  img?: string;
  typing?: boolean;
  read: boolean;
  unixtime?: number;
};

const ChatItemImg = memo((props: ChatItemImgProps) => {
  const {openMediaModal, activeMediaId} = useMediaModal();
  const {isUploading, progress, onLoadEnd} = useMediaUploading(props.mediaId);
  const hasFile = props.sourceURL !== undefined;

  console.log({isUploading, props, hasFile});

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
            <Box w="80%" h="2" borderRadius={'full'} borderWidth="1" bg="#fff">
              <Box
                w={`${progress}%`}
                h="100%"
                bg={appStyles.color.purpleMain}
              />
            </Box>
          </Center>
        )}

        <Pressable
          style={{
            aspectRatio: props.width / props.height,
            width: '100%',
          }}
          onPress={() => {
            openMediaModal(props.mediaId);
          }}>
          {/* アップロード中 */}
          {isUploading && (
            <FastImage
              style={[
                {
                  opacity: isUploading ? 1 : 0,
                  aspectRatio: props.width / props.height,
                },
                styles.img,
              ]}
              source={{
                uri: props.sourceURL,
              }}
              alt="mudai"
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {/* downloadURLがあるとき */}
          <FastImage
            style={[
              {
                opacity: isUploading ? 0 : 1,
                aspectRatio: props.width / props.height,
              },
              styles.img,
            ]}
            // source={assets.mudai}
            source={{uri: props.media}}
            alt="mudai"
            resizeMode={FastImage.resizeMode.cover}
            onLoadStar={() => {
              console.log('start loading');
            }}
            onLoadEnd={onLoadEnd}
          />
        </Pressable>
      </Box>
    </ChatItemWrapper>
  );
});

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
});

export default ChatItemImg;
