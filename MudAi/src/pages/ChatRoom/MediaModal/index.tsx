import React, {useState, useEffect, useRef} from 'react';
import {
  Center,
  HStack,
  Text,
  Box,
  VStack,
  Button,
  Pressable,
} from 'native-base';
import {
  Animated,
  View,
  Modal,
  Alert,
  PanResponder,
  StyleSheet,
} from 'react-native';
import {deleteDb, getDb, listenDb, offListenDb} from 'src/js/firebase';
import {useRoute} from '@react-navigation/native';
import {
  activeMediaIdAtom,
  currentMediaAtom,
  fullScreenLoadingAtom,
  mediaModalLoadingAtom,
} from 'src/recoil';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SvgClose from 'src/comp/svg/SvgClose';
import {formatDate, secondsToMinutes, showPrompt} from 'src/js/functions';
import SvgDelete from 'src/comp/svg/SvgDelete';
import SvgShare from 'src/comp/svg/SvgShare';
import SvgDownload from 'src/comp/svg/SvgDownload';
import {sheetShareActiveAtom} from 'src/recoil';
import SheetShare from 'src/pages/ChatRoom/SheetShare';
import RNFetchBlob from 'rn-fetch-blob';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import SvgPlay from 'src/comp/svg/SvgPlay';
import VideoPlayer from 'react-native-video-controls';
import SvgPause from 'src/comp/svg/SvgPause';
import FullScreenLoading from 'src/comp/FullScreenLoading';
import convertToProxyURL from 'react-native-video-cache';

type Props = {};

const MediaModal = (props: Props) => {
  const route = useRoute();
  const [mediaList, setMediaList] = useState<any[]>();
  const [activeMediaId, setActiveMediaId] = useRecoilState(activeMediaIdAtom);
  const resetActiveMediaId = useResetRecoilState(activeMediaIdAtom);
  const [currentMedia, setcurrentMedia] = useRecoilState(currentMediaAtom);

  const [isShowUtil, setisShowUtil] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (route) {
      const path = `chatRoom/${route.params.id}/media`;

      const setRoomMedia = v => {
        setMediaList(v);
      };

      listenDb(path, setRoomMedia);

      return () => {
        offListenDb(path, setRoomMedia);
      };
    }
  }, [route]);

  useEffect(() => {
    // console.log(activeMediaId);

    if (activeMediaId && mediaList) {
      const tmpMedia = mediaList[activeMediaId];

      setcurrentMedia(tmpMedia);
    }
  }, [activeMediaId]);

  const toggleUtil = () => {
    setisShowUtil(prev => !prev);
  };

  const isLoading = useRecoilValue(mediaModalLoadingAtom);

  return (
    <Modal visible={activeMediaId !== undefined} animationType={'fade'}>
      <FullScreenLoading isLoading={isLoading} type={'hiddenBg'} />

      {currentMedia && (
        <Box position="relative" w="100%" h="100%" pb={insets.bottom} bg="#000">
          <AnimWrapper
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              width: '100%',
            }}
            isShowUtil={isShowUtil}>
            <ModalHeader
              media={currentMedia}
              closeModal={() => {
                resetActiveMediaId();
              }}
            />
          </AnimWrapper>

          {currentMedia.mime.match(/video\//) ? (
            <>
              <MediaVideo
                media={currentMedia}
                toggleUtil={toggleUtil}
                isShowUtil={isShowUtil}
              />
            </>
          ) : (
            <MediaImage
              media={currentMedia}
              toggleUtil={toggleUtil}
              isShowUtil={isShowUtil}
            />
          )}
        </Box>
      )}
      <SheetShare />
    </Modal>
  );
};

const AnimWrapper = ({isShowUtil, style, children, ...others}) => {
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animOpacity, {
      toValue: isShowUtil ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isShowUtil]);

  return (
    <Animated.View
      style={[
        {
          opacity: animOpacity,
          pointerEvents: isShowUtil ? 'auto' : 'none',
        },
        style,
      ]}
      {...others}>
      {children}
    </Animated.View>
  );
};

const ModalHeader = props => {
  const insets = useSafeAreaInsets();
  const date = formatDate(true, props.media.createAt);

  return (
    <HStack
      bg={'rgba(0,0,0,0.5)'}
      w="100%"
      justifyContent="space-between"
      alignItems={'center'}
      gap="2"
      pt={`${insets.top}px`}
      pb="2"
      px="2">
      <Pressable w="6" h="6" onPress={props.closeModal}>
        <SvgClose color="#fff" />
      </Pressable>
      <VStack flex="1" alignItems={'center'}>
        <Center>
          <Text fontSize="sm">{props.media.filename}</Text>
          <Text
            fontSize={
              'xs'
            }>{`${date.y}/${date.m}/${date.d} ${date.hh}:${date.mm}`}</Text>
        </Center>
      </VStack>
      <Box w="6" h="6">
        {/* <SvgClose color="#fff" /> */}
      </Box>
    </HStack>
  );
};

const ModalFooter = props => {
  const insets = useSafeAreaInsets();
  const setisShowShareSheet = useSetRecoilState(sheetShareActiveAtom);
  const route = useRoute();
  const resetActiveMediaId = useResetRecoilState(activeMediaIdAtom);
  const setisLoading = useSetRecoilState(mediaModalLoadingAtom);

  const handleDelete = () => {
    showPrompt(
      'Are you sure you want to delete it?',
      'Other users will not be able to view this media',
      () => {
        const roomPath = `chatRoom/${route.params.id}/`;
        deleteDb(`${roomPath}/media/${props.media.id}`);
        deleteDb(`${roomPath}/chats/${props.media.createAt}`);
        resetActiveMediaId();
      },
    );
  };

  const handleShare = () => {
    setisShowShareSheet(true);
  };

  const handleSave = () => {
    const image_url = props.media.downloadUrl;
    const mediaType = props.media.mime.match(/video\//) ? 'video' : 'photo';
    const extension = props.media.mime.match(/\/(.*)$/)[1];

    setisLoading(true);

    RNFetchBlob.config({
      fileCache: true,
      appendExt: extension,
    })
      .fetch('GET', image_url)
      .then(res => {
        CameraRoll.save(res.data, {type: mediaType})
          .then(res => {
            Alert.alert('Success', 'Media added to camera roll!');
          })
          .catch(err => console.log(err));
      })
      .catch(error => console.log(error))
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <Box w="100%" px="2" bg={'rgba(0,0,0,0.5)'}>
      {props.children}
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        pt="2"
        pb={`${insets.bottom || 4}px`}
        gap="2">
        <Pressable onPress={handleDelete} w="6" h="6">
          <SvgDelete color={'#fff'} />
        </Pressable>
        <Pressable onPress={handleShare} w="6" h="6">
          <SvgShare color={'#fff'} />
        </Pressable>
        <Pressable onPress={handleSave} w="6" h="6">
          <SvgDownload color={'#fff'} />
        </Pressable>
      </HStack>
    </Box>
  );
};

const MediaVideo = props => {
  const videoRef = useRef();
  const [paused, setpaused] = useState(false);
  const [mediaData, setmediaData] = useState();
  const [progress, setprogress] = useState(0);

  return (
    <>
      <Pressable
        onPress={props.toggleUtil}
        style={{
          width: '100%',
          height: '100%',
        }}>
        <Video
          ref={videoRef}
          paused={paused}
          repeat={true}
          source={{uri: convertToProxyURL(props.media.downloadUrl)}}
          style={styles.fillParent}
          onLoad={data => {
            setmediaData(data);
          }}
          onProgress={data => {
            setprogress(data.currentTime / data.seekableDuration);
          }}
          onSeek={data => {
            setprogress(data.currentTime / mediaData.duration);
          }}
          onEnd={data => {
            setpaused(true);
          }}
        />
      </Pressable>

      <AnimWrapper
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
        }}
        isShowUtil={props.isShowUtil}>
        <Box mb="4">
          <VideoControls
            media={props.media}
            videoRef={videoRef}
            paused={paused}
            setpaused={setpaused}
            mediaData={mediaData}
            progress={progress}
          />
        </Box>

        <ModalFooter media={props.media} />
      </AnimWrapper>
    </>
  );
};

const MediaImage = props => {
  return (
    <>
      <Pressable onPress={props.toggleUtil}>
        <FastImage
          style={styles.fillParent}
          // source={assets.mudai}
          source={{uri: props.media.downloadUrl}}
          alt=""
          resizeMode={FastImage.resizeMode.contain}
        />
      </Pressable>
      <AnimWrapper
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 1,
          width: '100%',
        }}
        isShowUtil={props.isShowUtil}>
        <ModalFooter media={props.media} />
      </AnimWrapper>
    </>
  );
};

const VideoControls = props => {
  const pan = useRef(new Animated.ValueXY()).current;
  const max = useRef(100);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderStart: (e, s) => {
        props.setpaused(true);
        if (pan.x._offset > max.current) {
          pan.setOffset({x: max.current, y: 0});
        } else if (pan.x._offset < 0) {
          pan.setOffset({x: 0, y: 0});
        }
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        props.setpaused(false);
        pan.extractOffset();
      },
    }),
  ).current;

  useEffect(() => {
    if (!props.mediaData) {
      return;
    }
    const seek = e => {
      let progress;
      if (e.x > max.current) {
        progress = 1;
      } else if (e.x < 0) {
        progress = 0;
      } else {
        progress = e.x / max.current;
      }

      props.videoRef.current.seek(progress * props.mediaData.duration);
    };

    const listenerId = pan.addListener(seek);

    return () => {
      pan.removeListener(listenerId);
    };
  }, [props.mediaData]);

  useEffect(() => {
    if (!props.paused) {
      pan.setOffset({x: max.current * props.progress, y: 0});
    }
  }, [props.progress]);

  const setMax = e => {
    max.current = e.nativeEvent.layout.width;
  };

  if (!props.mediaData) {
    return null;
  }

  return (
    <HStack w="100%" alignItems="center" px="2" space="2">
      <Pressable
        w="6"
        h="6"
        onPress={() => {
          props.setpaused(prev => !prev);
        }}>
        {props.paused ? (
          <SvgPlay color={'#fff'} />
        ) : (
          <SvgPause color={'#fff'} />
        )}
      </Pressable>

      <HStack space="4" alignItems="center" flex="1">
        <Text>
          {secondsToMinutes(props.progress * props.mediaData.duration)}
        </Text>
        <Box flex="1" position="relative" onLayout={setMax}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: pan.x.interpolate({
                    inputRange: [0, max.current],
                    outputRange: [0, max.current],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
            // left={props.progress * 100 + '%'}
            {...panResponder.panHandlers}>
            <Box
              style={{
                position: 'absolute',
                width: 16,
                height: 16,
                backgroundColor: '#fff',
                top: '0',
                borderRadius: 999,
                transform: [{translateY: -8}],
                zIndex: 9999999,
              }}
            />
          </Animated.View>
          <Box bg="#fff" h="1px" />
        </Box>
        <Text>
          -
          {secondsToMinutes(
            props.mediaData.duration -
              props.progress * props.mediaData.duration,
          )}
        </Text>
      </HStack>
    </HStack>
  );
};

const styles = StyleSheet.create({
  fillParent: {
    width: '100%',
    height: '100%',
  },
});

export default MediaModal;
