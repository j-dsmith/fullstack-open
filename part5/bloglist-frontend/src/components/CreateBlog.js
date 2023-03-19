import { useState } from 'react';

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>
      <form>
        <div>
          <label htmlFor='title'>title:</label>
          <input
            type='text'
            name='title'
            placeholder='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author:</label>
          <input
            type='text'
            placeholder='Author'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>url:</label>
          <input
            type='text'
            placeholder='URL'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={(e) => handleCreateBlog(e, { title, author, url }, clearForm)}>
          create
        </button>
      </form>
    </>
  );
};
export default CreateBlog;
