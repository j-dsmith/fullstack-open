const Anecdote = ({ anecdote, header, votes }) => {
  return (
    <div>
      <h2>{header}</h2>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

export default Anecdote;
