import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNew = async (anecdote) => {
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

const updateVote = async (anecdote) => {
  const res = axios.put(`${baseUrl}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 });
  return res.data;
};

export default { getAll, updateVote, createNew };
