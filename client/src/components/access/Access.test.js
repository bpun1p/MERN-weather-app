import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AuthContextProvider} from '../../context/AuthContext';
import Access from './Access';
import React from 'react';

describe('<Access/> login', () => {
  const mockModalClicked = jest.fn();
  const mockLoggedInClicked = jest.fn();

  beforeEach(() => {
    render(<Access modalClicked={mockModalClicked} loggedInClicked={mockLoggedInClicked} />, {wrapper: AuthContextProvider});
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    cleanup();
  });
  it('should login user sucessfully', async () => {
    let username = 'bpun1p@gmail.com';
    let password = 'Test-1234';

    fireEvent.click(screen.getByRole('button', { name: /access/i }));

    let emailInputEl =  screen.getByPlaceholderText('Email');
    let passwordInputEl =  screen.getByPlaceholderText('Password');
    let loginBtnEl = screen.getByRole('button', { name: /login/i });

    expect(emailInputEl).toBeInTheDocument();

    fireEvent.change(emailInputEl, { target: { value: username}});
    fireEvent.change(passwordInputEl, { target: { value: password}});

    fireEvent.click(loginBtnEl);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument(); 
      expect(screen.getByText(username)).toBeInTheDocument();
    });
  });
  it('should handle failure successfully for login with missing inputs', () => {
    fireEvent.click(screen.getByRole('button', { name: /access/i }));
    fireEvent.click(screen.getByRole('button', {name: /login/i}));

    expect(screen.getByText('All fields must be filled')).toBeInTheDocument();
  });
  it('should handle failure successfully with invalid credentials', async () => {
    let username = 'fakeUser@gmail.com';
    let password = 'fakePassword';
    fireEvent.click(screen.getByRole('button', { name: /access/i }));

    let emailInputEl =  screen.getByPlaceholderText('Email');
    let passwordInputEl =  screen.getByPlaceholderText('Password');

    fireEvent.change(emailInputEl, { target: { value: username}});
    fireEvent.change(passwordInputEl, { target: { value: password}});

    fireEvent.click(screen.getByRole('button', { name: /login/i})); 

    await waitFor(() => {
      expect(screen.getByText('Incorrect email')).toBeInTheDocument();
    });
  });
});

describe('<Access/> Sign Up', () => {
  const mockModalClicked = jest.fn();
  const mockLoggedInClicked = jest.fn();
  const mockLoggedOutClicked = jest.fn();
  
  beforeEach(() => {
    render(<Access modalClicked={mockModalClicked} loggedInClicked={mockLoggedInClicked} loggedOutClicked={mockLoggedOutClicked}/>, {wrapper: AuthContextProvider});
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    cleanup();
  });
  // it('should sign up user successfully', async () => {
  //   let newUserEmail = 'newUser@gmail.com';
  //   let newUserPassword = 'Test_1234';
    
  //   let accessBtnEl = await screen.findByRole('button', { name: /access/i});
  //   fireEvent.click(accessBtnEl);

  //   let emailInputEl = screen.getByPlaceholderText('Email');
  //   let passwordInputEl = screen.getByPlaceholderText('Password');

  //   fireEvent.change(emailInputEl, { target: { value: newUserEmail}});
  //   fireEvent.change(passwordInputEl, { target: { value: newUserPassword}});

  //   fireEvent.click(screen.getByRole('button', { name: /sign up/i}));

  //   await waitFor(() => {
  //     expect(screen.getByRole('button', { name: /log out/i})).toBeInTheDocument();
  //     expect(screen.getByText(newUserEmail)).toBeInTheDocument();
  //   });

  //   fireEvent.click(screen.getByRole('button', { name: /log out/i}));

  //   await waitFor(() => { 
  //     expect(screen.getByRole('button', { name: /access/i})).toBeInTheDocument();
  //   });
  // });
  it('should handle failure for existing credentials', async () => {
    let newUserEmail = 'newUser@gmail.com';
    let newUserPassword = 'Test_1234';

    fireEvent.click(screen.getByRole('button', {name: /access/i}));
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: newUserEmail}});
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: newUserPassword}});
    fireEvent.click(screen.getByRole('button', { name: /sign up/i}));

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });
});

describe('guest login' , () => {
  const mockLoggedInClicked = jest.fn();
  const mockModalClicked = jest.fn();
  beforeEach(() => {
    render(<Access loggedInClicked={mockLoggedInClicked} modalClicked={mockModalClicked}/>, {wrapper: AuthContextProvider});
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    cleanup();
  });
  it('should be able to login successfully through guest login', async () => {
    fireEvent.click(screen.getByRole('button', {name: /access/i}));
    fireEvent.click(screen.getByRole('button', {name: /guest access/i}));
    
    await waitFor(() =>{
      expect(screen.getByText('Guest')).toBeInTheDocument();
      expect(screen.getByRole('button', {name: /log out/i})).toBeInTheDocument();
    });
  });
});