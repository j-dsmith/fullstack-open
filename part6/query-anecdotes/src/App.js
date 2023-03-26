import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import Error from './components/Error';
import Loading from './components/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import requests from './requests';
import { NotificationContextProvider, useContextDispatch } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useContextDispatch();

  const {
    data: anecdotes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['anecdote/getAll'],
    queryFn: requests.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const createMutation = useMutation({
    mutationKey: ['anecdote/createNew'],
    mutationFn: requests.createNew,
    onSuccess: (anecdote) => {
      dispatch({
        type: 'SET_MESSAGE',
        payload: `New anecdote added with content: ${anecdote.content}`,
      });
      const anecdotes = queryClient.getQueryData(['anecdote/getAll']);
      queryClient.setQueryData(['anecdote/getAll'], anecdotes.concat(anecdote));
    },
    onError: () => {
      dispatch({ type: 'SET_MESSAGE', payload: 'Too short anecdote, must have length 5 or more' });
    },
  });

  const voteMutation = useMutation({
    mutationKey: ['anecdote/vote'],
    mutationFn: requests.vote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdote/getAll']);

      queryClient.setQueryData(
        ['anecdote/getAll'],
        anecdotes.map((anecdote) => (anecdote.id !== updated.id ? anecdote : updated))
      );
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    dispatch({ type: 'SET_MESSAGE', payload: `You voted on ${anecdote.content}` });
  };

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm mutation={createMutation} />

      {anecdotes.map((anecdote) => (
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
};

export default App;
