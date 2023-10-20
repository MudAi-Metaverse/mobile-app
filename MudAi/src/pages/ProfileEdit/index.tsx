import React, {useState, useEffect} from 'react';
import {Center, Text, Box, VStack, Button, useDisclose} from 'native-base';
// import FormInput from 'src/comp/FormInput';
import useProfileEditForm from 'src/pages/ProfileEdit/ProfileEditForm/useProfileEditForm';
import CustomButton from 'src/comp/CustomButton';
import Typography from 'src/comp/Typography';
import ListContainer from 'src/comp/ListContainer';
import UploadImg from 'src/pages/ProfileEdit/UploadImg';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileEdit = props => {
  const {
    name,
    setname,
    twitterId,
    settwitterId,
    instagramId,
    setinstagramId,
    onSubmit,
  } = useProfileEditForm();

  return (
    <ListContainer
      w="100%"
      h="100%"
      _boxStyle={{
        w: '100%',
        flex: 1,
      }}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 56}}>
        <Text fontSize={'lg'} fontWeight={'800'} fontFamily={'Inter'} mb="6">
          Edit your profile
        </Text>
        <Box mb="22px" borderRadius="20" bg="#21242D">
          <UploadImg />
        </Box>

        <VStack space="4" mb="96px">
          <FormInput setFunc={setname} value={name} placeholder={'name'} />
          <FormInput
            setFunc={settwitterId}
            value={twitterId}
            placeholder={'twitterId'}
          />
          <FormInput
            setFunc={setinstagramId}
            value={instagramId}
            placeholder={'instagramId'}
          />
        </VStack>

        <Center>
          <CustomButton
            onPress={() => {
              onSubmit(() => {
                props.onClose();
              });
            }}>
            <Typography type="p_main_eng_bold">Save</Typography>
          </CustomButton>
        </Center>
      </ScrollView>
    </ListContainer>
  );
};

const FormInput = ({setFunc, ...others}) => {
  const inputStyle = {
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
    backgroundColor: '#21242D',
    borderRadius: 16,
    color: '#fff',
  };

  return (
    <BottomSheetTextInput
      style={inputStyle}
      onChange={e => {
        setFunc(e.nativeEvent.text);
      }}
      placeholderTextColor={'#565656'}
      {...others}
    />
  );
};

export default ProfileEdit;
