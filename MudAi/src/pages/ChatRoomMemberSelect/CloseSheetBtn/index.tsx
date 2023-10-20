import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'native-base';
import SvgClose from 'src/comp/svg/SvgClose';

const CloseSheetBtn = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      ml="2"
      w="6"
      h="6"
      onPress={() => {
        navigation.goBack();
      }}>
      <SvgClose color="#fff" />
    </Pressable>
  );
};

export default CloseSheetBtn;
