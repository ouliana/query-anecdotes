import { useNotificationDispatch } from '../NotificationContext';

function Button({ type, label, anecdote, handleVote }) {
  const dispatch = useNotificationDispatch();

  return <button onClick={handleClick}>{label}</button>;

  function handleClick() {
    dispatch({ type, payload: anecdote.content });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
    handleVote(anecdote);
  }
}

export default Button;
