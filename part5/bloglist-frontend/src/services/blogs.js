import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNew = async (blog, token) => {
  const response = await axios.post(baseUrl, blog, { headers: { Authorization: token } });
  return response.data;
};

const update = async (updatedBlog, token) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, {
    headers: { Authorization: token },
  });
  return response.data;
};

const remove = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } });
  return response.data;
};

export default { getAll, createNew, update, remove };
