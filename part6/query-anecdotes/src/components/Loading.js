const Loading = () => {
  const style = {
    paddingInline: 16,
    paddingBlock: 32,
    background: '#a8a29e',
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
  return <div style={style}>Loading...</div>;
};
export default Loading;
