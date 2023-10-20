import React, {useEffect} from 'react';
import css from './CompleteModal.module.scss';
import {Box, Image, Modal, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Typography from 'src/comp/Typography';
import CustomButton from 'src/comp/CustomButton';
import {StyleSheet} from 'react-native';
import {assets} from 'src/js/configView';
import {BlurView} from '@react-native-community/blur';

export type CompleteModalProps = {
  showModal: boolean;
  setshowCompleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompleteModal = (props: CompleteModalProps) => {
  const navigation = useNavigation();

  return (
    <Modal
      isOpen={props.showModal}
      onClose={() => {
        props.setshowCompleteModal(false);
      }}>
      <BlurView style={styles.absolute} blurAmount={5} blurType="light" />
      <Box style={styles.comp}>
        <Box style={styles.content}>
          <Box style={styles.imgWrap}>
            <Image style={styles.img} source={assets.mudai} alt="mudai" />
          </Box>

          <Box style={styles.titleWrap}>
            <Box style={styles.title}>
              <Typography type="h_eng">Successful</Typography>
              <Typography type="h_eng" style={styles.bottomText}>
                Personalyzed
              </Typography>
            </Box>
          </Box>
          <Box style={styles.sec_btn}>
            <CustomButton
              style={styles.btn}
              onPress={() => {
                props.setShowModal(false);
                navigation.navigate('ChatHome');
              }}>
              <Typography type="p_main_eng_bold">
                Talk with you Ai chat
              </Typography>
            </CustomButton>
            <Pressable
              onPress={() => {
                props.setShowModal(false);
                navigation.navigate('Index');
              }}>
              <Typography type={'p_main_eng'}>Back to home</Typography>
            </Pressable>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
  comp: {},

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  sec_btn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  imgWrap: {
    padding: 8,
    backgroundColor: '#ffffff',
    // boxShadow: '5 6 24 rgba(126, 132, 161, 0.1)',
    borderRadius: 16,
    marginBottom: 18,
  },

  img: {
    width: 216,
    height: 156,
    borderRadius: 16,
    objectFit: 'cover',
  },

  titleWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 27,
  },

  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  btn: {
    width: 319,
    alignSelf: 'center',
  },
});

export default CompleteModal;
