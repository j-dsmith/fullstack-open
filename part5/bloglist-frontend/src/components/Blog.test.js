import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

describe('<Blog/>', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url: 'www.example.com',
    likes: 1,
  };
  test('renders title and author by default', () => {
    const { container } = render(<Blog blog={blog} removeBlog={() => {}} likeBlog={() => {}} />);
    const title = screen.getByText(blog.title);
    const author = screen.getByText(blog.author);

    const hiddenContent = container.querySelector('.blog-content');

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(hiddenContent).toBeFalsy();
  });

  test('url and likes are shown when "view" button is clicked', async () => {
    const { container } = render(<Blog blog={blog} removeBlog={() => {}} likeBlog={() => {}} />);

    const user = userEvent.setup();

    const button = screen.getByText('View');
    await user.click(button);

    const hiddenContent = container.querySelector('.blog-content');
    expect(hiddenContent).toBeDefined();
  });

  test('clicking likes button calls event handler', async () => {
    const likeMockHandler = jest.fn();
    const { container } = render(
      <Blog blog={blog} removeBlog={() => {}} likeBlog={likeMockHandler} />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText('View');
    await user.click(viewButton);

    const likeButton = container.querySelector('button.like-button');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
