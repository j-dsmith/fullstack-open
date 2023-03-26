import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },
    removeNotification() {
      return '';
    },
  },
});

export const { setMessage, removeNotification } = notificationSlice.actions;
export const setNotification = (content, timout) => {
  return async (dispatch) => {
    dispatch(setMessage(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, timout * 1000);
  };
};
export default notificationSlice.reducer;
