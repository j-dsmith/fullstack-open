import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeNotification, setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  // if (!notification.length) {
  //   return null;
  // }

  // if (!notification.length) {
  //   return null;
  // }

  // useEffect(() => {
  //   if (notification.length) {
  //     console.log('error');
  //     setTimeout(() => {
  //       dispatch(removeNotification());
  //     }, 5000);
  //   }
  // }, [notification, dispatch]);

  if (!notification.length) {
    return null;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
