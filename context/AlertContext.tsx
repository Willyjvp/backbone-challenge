import { Alert } from '@mui/material';
import { createContext, useContext, useState } from 'react';

type Alert = {
  type: 'success' | 'info' | 'error';
  message: string;
  show: boolean;
};

type AlertContextType = {
  alert: Alert;
  handleAlert: (alert: Alert) => void;
};

const AlertContext = createContext<AlertContextType>({
  alert: {
    type: 'info',
    message: '',
    show: false,
  },
  handleAlert: (alert: Alert) => {},
});

export const useAlertContext = () => {
  return useContext(AlertContext);
};

export const AlertContextProvider = ({ children }: any) => {
  const [alert, setError] = useState<Alert>({
    type: 'info',
    message: '',
    show: false,
  });

  const handleAlert = (alert: Alert) => {
    setError(alert);

    setTimeout(
      () =>
        setError({
          type: 'info',
          message: '',
          show: false,
        }),
      3000
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alert,
        handleAlert,
      }}
    >
      {children}
      {alert.show && (
        <>
          <Alert
            severity={alert.type}
            sx={{ position: 'absolute', bottom: '20px', right: '20px' }}
          >
            {alert.message}
          </Alert>
        </>
      )}
    </AlertContext.Provider>
  );
};
