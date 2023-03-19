const Notification = ({ info }) => {
  const color = info.type === 'error' ? 'rgb(220 38 38)' : 'rgb(34 197 94)';
  const styles = {
    background: color,
    padding: 16,
    minWidth: 'max-content',
    maxWidth: 500,
    borderRadius: 4,
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '1.25rem',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    position: 'fixed',
    top: 10,
    right: 10,
  };

  return info.type ? (
    <div data-cy='notification' style={styles}>
      {info.message}
    </div>
  ) : null;
};

export default Notification;
