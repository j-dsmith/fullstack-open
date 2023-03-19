import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateBlog from './CreateBlog';

describe('<CreateBlog />', () => {
  test('correct info is passed to handler when creating new blog', async () => {
    const mockSubmitHandler = jest.fn((e) => e.preventDefault());
    render(<CreateBlog handleCreateBlog={mockSubmitHandler} />);
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText('Title');
    const authorInput = screen.getByPlaceholderText('Author');
    const urlInput = screen.getByPlaceholderText('URL');
    const button = screen.getByText('create');

    await user.type(titleInput, 'testing a form');
    await user.type(authorInput, 'tester');
    await user.type(urlInput, 'www.example.com');
    await user.click(button);

    const { title, author, url } = mockSubmitHandler.mock.calls[0][1];

    expect(title).toBe('testing a form');
    expect(author).toBe('tester');
    expect(url).toBe('www.example.com');
  });
});
