// toastConfig.js
import { useToast } from '@chakra-ui/react';

const toastConfig = () => {
  const toast = useToast();

  const showLoadingToast = () => {
    return toast({
      title: 'Promise pending',
      description: 'Please wait',
      status: 'info',
      duration: null, // set to null for indefinite duration
      isClosable: false,
    });
  };

  const hideLoadingToast = () => {
    toast.closeAll();
  };

  return { showLoadingToast, hideLoadingToast };
};

export default toastConfig;
