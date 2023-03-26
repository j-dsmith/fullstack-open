import { useDispatch } from 'react-redux';
import { createNew } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const newAnecdote = {
      content,
      votes: 0,
    };

    dispatch(createNew(newAnecdote));
    dispatch(setNotification(`You created new anecdote: ${content}`, 5));

    e.target.anecdote.value = '';
  };

  return (
    <>
      <h2>add new</h2>
      <form onSubmit={handleSubmit}>
        <input name='anecdote' type='text' />
        <button>create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
