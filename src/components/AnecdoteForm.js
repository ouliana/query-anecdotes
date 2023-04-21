import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: function () {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const dispatch = useNotificationDispatch();

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );

  function onCreate(event) {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });

    dispatch({ type: 'ADD', payload: content });
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000);
  }
};

export default AnecdoteForm;
