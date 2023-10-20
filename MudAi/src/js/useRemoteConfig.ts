import remoteConfig from '@react-native-firebase/remote-config';
import {useEffect} from 'react';
import {useRecoilCallback} from 'recoil';
import {remoteConfigAtomFamily} from 'src/recoil';

const useRemoteConfig = () => {
  const setMetaAtomFamily = useRecoilCallback(({set}) => (key, value) => {
    set(remoteConfigAtomFamily(key), value);
  });

  useEffect(() => {
    const main = async () => {
      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 1,
      });

      await remoteConfig()
        .setDefaults(data)
        .then(() => remoteConfig().fetchAndActivate())
        .then(fetchedRemotely => {
          // if (fetchedRemotely) {
          //   console.log(
          //     'Configs were retrieved from the backend and activated.',
          //   );
          // } else {
          //   console.log(
          //     'No configs were fetched from the backend, and the local configs were already activated',
          //   );
          // }
        });

      const parameters = remoteConfig().getAll();

      Object.entries(parameters).forEach($ => {
        const [key, entry] = $;
        setMetaAtomFamily(key, switchGetType(key, entry));
      });
    };

    main();
  }, []);
};

const switchGetType = (key, value) => {
  const type = typeof data[key];

  switch (type) {
    case 'boolean':
      return value.asBoolean();
    case 'number':
      return value.asNumber();
    case 'string':
      return value.asString();
    default:
      return value.asString();
  }
};

const data = {
  dev: false,
};

export default useRemoteConfig;
