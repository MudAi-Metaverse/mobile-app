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
import {Animated, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  value: Date;
  onChange: (event: any, selectedDate: any) => void;
};

const DateTimePickerWrapper = ({
  showDatePicker,
  setShowDatePicker,
  value,
  onChange,
}: Props) => {
  const [datePickerHeight, setdatePickerHeight] = useState(0);
  const height = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const options = {
      duration: 200,
      // useNativeDriver: true,
    };
    if (showDatePicker) {
      Animated.timing(height, {toValue: datePickerHeight, ...options}).start();
    } else {
      Animated.timing(height, {toValue: 0, ...options}).start();
    }
  }, [showDatePicker]);

  const formatDate = date => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };

  const dateInputTextStyle = {
    py: '4',
    px: 0,
    borderRadius: '0',
    borderWidth: '0',
    fontSize: 'md',
    fontFamily: 'Inter',
    fontWeight: '700',
    color: '#fff',
  };

  return (
    <Box position="relative">
      <Pressable
        onPress={() => {
          setShowDatePicker(prev => !prev);
        }}>
        <Text {...dateInputTextStyle}>{formatDate(value)}</Text>
      </Pressable>
      <Animated.View
        style={{
          overflow: 'hidden',
          height,
        }}>
        <DateTimePicker
          value={value}
          mode={'date'}
          onChange={onChange}
          display={'spinner'}
          textColor="#fff" // ios only
          accentColor="#fff"
          themeVariant="dark"
          onLayout={event => {
            setdatePickerHeight(event.nativeEvent.layout.height);
          }}
        />
      </Animated.View>
    </Box>
  );
};

export default DateTimePickerWrapper;
