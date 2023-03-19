import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, removeBlog, loggedInUser }) => {
  const [viewAll, setViewAll] = useState(false);
  const { title, author, url, likes, user } = blog;

  const styles = {
    blogStyle: {
      padding: 16,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      fontFamily: 'sans-serif',
      background: 'rgb(244 244 245)',
      borderRadius: 8,
      marginBlockEnd: 16,
      border: '1px solid rgb(212 212 216)',
      minWidth: 'fit-content',
    },
    contentStyle: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    bottomRowStyle: {
      marginBlockStart: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    headerStyle: {
      display: 'flex',
      gap: 16,
      alignItems: 'baseline',
    },
    authorStyle: {
      fontStyle: 'italic',
      color: 'rgb(39 39 42)',
      fontWeight: 300,
    },
    buttonStyle: {
      borderRadius: 8,
      height: 30,
      width: 60,
      border: 'none',
      background: 'rgb(39 39 42)',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      color: 'white',
      marginInlineStart: 'auto',
    },
    likeButtonStyle: {
      border: '1px solid rgb(225 29 72)',
      padding: 0,
      borderRadius: 8,
      color: 'rgb(225 29 72)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      gap: 4,
      // position: "relative",
      height: 30,
      width: 60,
    },
    heartStyle: {
      background: 'rgb(225 29 72)',
      display: 'grid',
      placeItems: 'center',
      flex: 1,
      height: '100%',
      paddingInline: 4,
    },
    likesStyle: {
      width: '60%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 2,
    },
  };

  const toggleVisibility = () => {
    setViewAll((prev) => !prev);
  };

  return (
    <div data-cy='blog' style={styles.blogStyle}>
      <div data-cy='blog-header' style={styles.headerStyle}>
        <h3>{title}</h3>
        <p style={styles.authorStyle}>{author}</p>
        <button
          style={{ ...styles.buttonStyle, display: viewAll ? 'none' : '' }}
          onClick={toggleVisibility}
          data-cy='view-content-button'
        >
          View
        </button>
        <button
          style={{
            ...styles.buttonStyle,
            background: 'transparent',
            border: '2px solid rgb(39 39 42)',
            color: 'rgb(39 39 42)',
            display: viewAll ? '' : 'none',
          }}
          onClick={toggleVisibility}
        >
          Hide
        </button>
      </div>

      {viewAll && (
        <div style={styles.contentStyle} className='blog-content'>
          <p style={{ margin: 0, textDecoration: 'underline' }}>{url}</p>
          <button
            style={styles.likeButtonStyle}
            onClick={() => likeBlog(blog)}
            className='like-button'
            data-cy='like-button'
          >
            <span className='likes-count' data-cy='likes-count' style={styles.likesStyle}>
              +{likes}
            </span>
            <span className='likes-icon' style={styles.heartStyle}>
              🤍
            </span>
          </button>
          <div style={styles.bottomRowStyle}>
            {user && <p style={{ margin: 0 }}>{user.username}</p>}
            {loggedInUser.username === user.username && (
              <button
                style={styles.buttonStyle}
                onClick={() => removeBlog(blog)}
                data-cy='remove-button'
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
