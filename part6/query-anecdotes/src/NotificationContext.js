import { createContext, useContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.payload;
    case 'REMOVE_MESSAGE':
      return '';
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const useContextValue = () => {
  const ctx = useContext(NotificationContext);
  return ctx[0];
};

export const useContextDispatch = () => {
  const ctx = useContext(NotificationContext);
  return ctx[1];
};

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
