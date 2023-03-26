import { useDispatch, useSelector } from 'react-redux';
import { updateVote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter) {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  const handleVote = (content, anecdote) => {
    dispatch(updateVote(anecdote));
    dispatch(setNotification(content, 5));
  };

  const renderAnecdotes = () => {
    return [...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(`You voted on: ${anecdote.content}`, anecdote)}
        />
      ));
  };
  return <div>{renderAnecdotes()}</div>;
};

const Anecdote = ({ anecdote, handleClick }) => {
  console.log(anecdote);
  return (
    <div style={{ border: '1px solid black', margin: '8px 16px' }}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};
export default AnecdoteList;
