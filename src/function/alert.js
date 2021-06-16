import { message } from 'antd';

// Message Type =[success, error, info, warning, warn, loading];
message.config({ maxCount: 2 });

export const alert = (props) => {
  if (typeof props == 'string') props = { content: props };

  const {
    type = 'info',
    content = '',
    duration = '1.5',
    ...rest
  } = props;

  message.open({ type, content, duration, ...rest });
};

export const errorAlert = (err) => {
  const message =
    typeof err == 'string?'
      ? err
      : err?.response?.data?.message || err?.message;
  alert({ content: message, type: 'error' });
};
