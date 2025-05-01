import {toast} from 'sonner';

const withHandleError = <A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  options: {errorHandler?: (error: Error) => void; showToast?: boolean} = {},
) => {
  const {errorHandler = () => {}, showToast = true} = options;

  return async (...args: A) => {
    try {
      return await fn(...args);
    } catch (error) {
      handleError(error, errorHandler, showToast);
      return;
    }
  };
};

const handleError = (
  error: unknown,
  errorHandler: (error: Error) => void,
  showToast: boolean,
) => {
  console.error(error);
  if (error instanceof Error) {
    errorHandler(error);
    if (showToast) toast.error(error.message);
  }
};

export {withHandleError, handleError};
