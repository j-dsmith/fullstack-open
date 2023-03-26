import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAnecdotes.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(createNew.fulfilled, (state, action) => {
      state.push(action.payload);
    });

    builder.addCase(updateVote.fulfilled, (state, action) => {
      return state.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      );
    });
  },
});

export const initializeAnecdotes = createAsyncThunk('anecdotes/initializeAnecdotes', async () => {
  return await anecdoteService.getAll();
});

export const createNew = createAsyncThunk('anecdotes/createNew', async (anecdote) => {
  await anecdoteService.createNew(anecdote);
  return anecdote;
});

export const updateVote = createAsyncThunk('anecdotes/updateVote', async (updatedAnecdote) => {
  await anecdoteService.updateVote(updatedAnecdote);
  return updatedAnecdote.id;
});

export default anecdoteSlice.reducer;
