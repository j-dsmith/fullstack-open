export const handleShowNotification = (create, remove) => {
  create();
  setTimeout(() => {
    remove();
  }, 5000);
};
