import { createContext, useReducer, useContext } from 'react';

function notificationReducer(state, action) {
  switch (action.type) {
    case 'VOTE':
      return `anecdote "${action.payload}" voted`;
    case 'ADD':
      return `anecdote "${action.payload}" added`;
    case 'CLEAR':
      return '';
    default:
      return state;
  }
}

const NotificationContext = createContext();
console.log({ NotificationContext });

export function NotificationContextProvider(props) {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export function useNotificationValue() {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
}

export function useNotificationDispatch() {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
}

export default NotificationContext;
