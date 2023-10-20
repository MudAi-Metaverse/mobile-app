import {Box, Container, Select} from 'native-base';
import React, {useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {setAsyncStorage} from 'src/js/functions';
import {getAsyncStorage} from 'src/js/functions';
import {langAtom} from 'src/recoil';

type Props = {
  value: string;
  onChange: any;
};

const SelectLang = (props: Props) => {
  const setLangAtom = useSetRecoilState(langAtom);

  useEffect(() => {
    const main = async () => {
      const lang = await getAsyncStorage('lang');
      setLangAtom(lang || 0);
    };
    main();
  }, []);

  return (
    <Container mx="auto">
      {/* <label htmlFor="selectLang" style={`${css["label"]}`}>
        select language
      </label> */}
      <Select
        rounded="10"
        minW="100"
        color="text.600"
        borderWidth={1}
        borderColor={'#fff'}
        borderBottomColor={'#fff'}
        variant="unstyled"
        textAlign={'center'}
        fontSize={'md'}
        // style={styles.select}
        // id="selectLang"
        dropdownIcon={<></>}
        onValueChange={value => {
          props.onChange(value);
          setAsyncStorage('lang', value);
          setLangAtom(Number(value));
        }}
        selectedValue={props.value}>
        <Select.Item label="English" value="0" />
        <Select.Item label="Japanese" value="1" />
      </Select>
    </Container>
  );
};

export default SelectLang;
