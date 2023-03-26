import { useContext } from 'react';
import { NotificationContext } from '../NotificationContext';

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const [notification, dispatch] = useContext(NotificationContext);

  if (!notification.length > 0) return null;

  setTimeout(() => {
    dispatch({ type: 'REMOVE_MESSAGE' });
  }, 5000);

  return <div style={style}>{notification}</div>;
};

export default Notification;
