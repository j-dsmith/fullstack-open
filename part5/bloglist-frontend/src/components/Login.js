import { useState } from 'react';
import userService from '../services/user';

const Login = ({ setUser, notifyWith }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login({ username, password });
      if (user) {
        setUser(user);
        window.localStorage.setItem('loggedInUserJSON', JSON.stringify(user));
      }
    } catch ({ response }) {
      console.log('in catch');
      notifyWith(response.data.error, 'error');
    }

    clearForm();
  };

  const clearForm = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        name='username'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor='password'>password</label>
      <input
        type='text'
        name='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button onClick={handleSubmit}>submit</button>
    </form>
  );
};
export default Login;
