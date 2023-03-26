const Error = () => {
  const style = {
    paddingInline: 16,
    paddingBlock: 32,
    background: '#e11d48',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 24,
    borderRadius: 8,
    maxWidth: 'fit-content',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return <div style={style}>Anecdote service not available due to problems in server</div>;
};
export default Error;
