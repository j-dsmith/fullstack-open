const Notification = ({ message, type }) => {
  const accentColor = type === "error" ? "red" : "green";
  const notificationClasses = {
    background: "hsl(0deg 3% 75%)",
    border: "2px solid",
    borderColor: accentColor,
    padding: 10,
    marginBlockEnd: 20,
    color: accentColor,
    fontSize: 20,
    borderRadius: 4,
  };

  if (!type) {
    return null;
  }
  return <div style={notificationClasses}>{message}</div>;
};
export default Notification;
