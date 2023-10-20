import React, {useEffect} from 'react';
import {Box, Image, Modal, Text} from 'native-base';
import CustomButton from 'src/comp/CustomButton';
import {StyleSheet} from 'react-native';
import {assets} from 'src/js/configView';
import Typography from 'src/comp/Typography';
import {useNavigation} from '@react-navigation/native';

export type CompleteModalProps = {
  showModal: boolean | undefined;
  sethasNoResult: React.Dispatch<React.SetStateAction<boolean>>;
};

const PersonalizeModal = (props: CompleteModalProps) => {
  const navigation = useNavigation();

  return (
    <Modal
      isOpen={props.showModal}
      onClose={() => {
        props.sethasNoResult(false);
      }}>
      <Box style={styles.content}>
        <Box style={styles.imgWrap}>
          <Image style={styles.img} source={assets.slider_4} alt="" />
        </Box>

        <Box style={styles.sec_btn}>
          <CustomButton
            style={styles.btn}
            onPress={() => {
              props.sethasNoResult(false);
              navigation.navigate('Personalizing');
            }}>
            <Typography type="p_main_eng_bold">start personalizing</Typography>
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default PersonalizeModal;
