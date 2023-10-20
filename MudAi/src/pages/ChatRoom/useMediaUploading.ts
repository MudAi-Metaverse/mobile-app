import {useEffect, useState} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {uploadingMediaFamily} from 'src/recoil';

const useMediaUploading = (mediaId: string) => {
  const uploadingMedia = useRecoilValue(uploadingMediaFamily(mediaId));
  const resetUploadingMedia = useResetRecoilState(
    uploadingMediaFamily(mediaId),
  );
  const [isUploading, setisUploading] = useState(uploadingMedia !== undefined);
  const [progress, setprogress] = useState(0);

  useEffect(() => {
    if (uploadingMedia !== undefined) {
      setisUploading(true);
      setprogress(uploadingMedia.progress);
    }
  }, [uploadingMedia]);

  const onLoadEnd = () => {
    console.log('onLoadEnd');
    setisUploading(false);
    resetUploadingMedia();
  };

  return {
    isUploading,
    progress,
    onLoadEnd,
  };
};

export default useMediaUploading;
