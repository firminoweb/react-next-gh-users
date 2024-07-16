import React from 'react';
import { render, screen, act } from '@testing-library/react';
import UserPage from '../user';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) => {
  if (input.toString().includes('/repos')) {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: 'Repo 1',
            html_url: 'http://example.com/repo1',
          },
        ]),
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
      type: 'basic',
      url: input.toString(),
      clone: () => Promise.resolve(this as unknown as Response),
      text: () => Promise.resolve(''),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
    } as unknown as Response);
  }

  return Promise.resolve({
    json: () => Promise.resolve({ name: 'Test User', bio: 'Test Bio' }),
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: input.toString(),
    clone: () => Promise.resolve(this as unknown as Response),
    text: () => Promise.resolve(''),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    blob: () => Promise.resolve(new Blob()),
    formData: () => Promise.resolve(new FormData()),
  } as unknown as Response);
}) as jest.Mock;

describe('UserPage', () => {
  it('renders the User page', async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: { username: 'testuser' },
    }));

    await act(async () => {
      render(<UserPage />);
    });

    const heading = screen.getByText(/Test User/i);
    expect(heading).toBeInTheDocument();
  });
});
