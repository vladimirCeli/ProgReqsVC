import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      {children}
    </>
  );
};

export default ToastProvider;
