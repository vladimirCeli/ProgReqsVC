import { toast } from 'react-toastify';

const useToast = () => {
  const showToast = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    warning: (message) => toast.warning(message),
    info: (message) => toast.info(message),
  };

  return { toast: showToast };
};

export default useToast;
