import {useAccount} from 'wagmi';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {err} from 'react-native-svg/lib/typescript/xml';
import {getStore, setStore} from 'src/js/firebase';
import {useNavigation} from '@react-navigation/native';

const useProfileEditForm = () => {
  const {address} = useAccount();
  const [errors, setErrors] = useState({});
  const [name, setname] = useState('');
  const [twitterId, settwitterId] = useState('');
  const [instagramId, setinstagramId] = useState('');

  useEffect(() => {
    if (!address) {
      return;
    }

    getStore(`user/${address}`).then(res => {
      setname(res?.name || '');
      settwitterId(res?.twitterId || '');
      setinstagramId(res?.instagramId || '');
    });
  }, [address]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const validate = () => {
    // if (formData.name === undefined) {
    //   setErrors({...errors, name: 'Name is required'});
    //   return false;
    // }

    setErrors({});
    return true;
  };

  const onSubmit = callBack => {
    if (validate()) {
      setStore(`user/${address}`, {
        name,
        twitterId,
        instagramId,
      }).then(res => {
        Alert.alert('Success', 'Your profile has been updated');
        callBack();
      });
    }
  };

  return {
    onSubmit,
    name,
    setname,
    twitterId,
    settwitterId,
    instagramId,
    setinstagramId,
  };
};
export default useProfileEditForm;
