import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, addVote } from './requests';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

function App() {
  const queryClient = useQueryClient();
  const addVoteMutation = useMutation(addVote, {
    onSuccess: function () {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const {
    isLoading,
    isError,
    data: anecdotes,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>anecdote service not available due to problems on server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );

  function handleVote(anecdote) {
    addVoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
  }
}

export default App;
