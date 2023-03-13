const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => (sum += current.likes), 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current));
  return { title: mostLikes.title, author: mostLikes.author, likes: mostLikes.likes };
};

const mostBlogs = (blogs) => {
  const tally = blogs.reduce((tally, current) => {
    tally[current.author] = (tally[current.author] || 0) + 1;
    return tally;
  }, {});

  const highestTally = Object.entries(tally).reduce((prev, current) =>
    prev[1] > current[1] ? prev : current
  );

  return { author: highestTally[0], blogs: highestTally[1] };
};

const mostLikes = (blogs) => {
  const tally = blogs.reduce((tally, current) => {
    tally[current.author] = (tally[current.author] || 0) + current.likes;
    return tally;
  }, {});

  const highestTally = Object.entries(tally).reduce((prev, current) =>
    prev[1] > current[1] ? prev : current
  );

  return { author: highestTally[0], likes: highestTally[1] };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
