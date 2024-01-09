import { Alert, message } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type TypeFlashMessage = 'success' | 'error' | 'warning' | 'info';

export type Message = {
  content: string;
  type?: 'success' | 'error' | 'warning' | 'info' | undefined;
};

export default function FlashMessage(props: {
  open: boolean;
  messageContent: string | string[] | undefined | any;
  type?: TypeFlashMessage;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { open = false, messageContent, type } = props;
  const severity = type || 'success';
  const [messageApi, contextHolder] = message.useMessage();

  const handleCloseAlert = () => {
    messageApi.destroy();
    // Remove any flash messages in the URL.
    if (!location?.search) return;
    setTimeout(() => {
      navigate({ pathname: location?.pathname }, { replace: true });
    }, 0);
  };

  /**
   * function alert flash message
   */
  const AlertMessage = () => {
    messageApi.open({
      content: (
        <Alert
          message={messageContent}
          type={severity}
          showIcon
          afterClose={handleCloseAlert}
        />
      ),
      duration: 2,
      onClose: handleCloseAlert,
    });
  };
  // display flash message
  useEffect(() => {
    if (open) {
      AlertMessage();
    }
  }, [open]);

  return <>{contextHolder}</>;
}
