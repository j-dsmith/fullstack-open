import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import Notification from './components/Notification';
import Toggleable from './components/Toggleable';
import blogService from './services/blogs';
import userService from './services/user';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({});
  const noteFormRef = useRef(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUserJSON');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    userService.logout();
  };

  const handleCreateBlog = async (e, blog, clearForm) => {
    e.preventDefault();
    const { title, author, url } = blog;
    await blogService.createNew({ title, author, url }, `Bearer ${user.token}`);
    const blogs = await blogService.getAll();
    notifyWith(`${title} by ${author} created successfully`);
    setBlogs(blogs);
    clearForm();
    noteFormRef.current.toggleVisibility();
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      console.log(updatedBlog);
      await blogService.update(updatedBlog, user.token);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch ({ response }) {
      notifyWith(response.data.error, 'error');
    }
  };

  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) return;
    try {
      await blogService.remove(blog.id, `Bearer ${user.token}`);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      notifyWith('Blog deleted successfully');
    } catch ({ response }) {
      notifyWith(response.data.error, 'error');
    }
  };

  const notifyWith = (message, type = 'info') => {
    setNotification((prev) => ({ ...prev, message, type }));

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, type: null }));
    }, 3000);
  };

  const renderBlogs = () => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return (
      <div style={{ width: 'max-content' }} data-cy='blog-list'>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            data-key={blog.id}
            blog={blog}
            loggedInUser={user}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
          />
        ))}
      </div>
    );
  };

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification info={notification} />
        <p>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
          <Toggleable label='new blog' ref={noteFormRef}>
            <CreateBlog handleCreateBlog={handleCreateBlog} />
          </Toggleable>
        </p>
        {renderBlogs()}
      </div>
    );
  }

  return (
    <div>
      <h2>login to application</h2>
      <Notification info={notification} />
      <Login setUser={setUser} notifyWith={notifyWith} />
    </div>
  );
};

export default App;
