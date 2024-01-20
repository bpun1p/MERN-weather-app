import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AuthContextProvider} from '../../context/AuthContext';
import AccessModal from './AccessModal';
import React from 'react';

describe('<AccessModal /> components should render successfully', () => {

  beforeEach(() => {
    render(<AccessModal />, { wrapper: AuthContextProvider });
  });

  afterEach(() => {
    cleanup();
  });

  it('should render email input successfully', () => {
    const emailInputEl = screen.getByPlaceholderText('Email');
    expect(emailInputEl).toBeInTheDocument();
  });
  it('should render password input successfully', () => {
    const passwordInputEl = screen.getByPlaceholderText('Password');
    expect(passwordInputEl).toBeInTheDocument();
  });
  it('should render login button successfully', () => {
    const loginBtnEl = screen.getByRole('button', { name: 'Login' });
    expect(loginBtnEl).toBeInTheDocument();
    expect(loginBtnEl).toHaveTextContent('Login');
  });
  it('should render sign up button successfully', () => {
    const signUpBtnEl = screen.getByRole('button', { name: 'Sign Up' });
    expect(signUpBtnEl).toBeInTheDocument();
    expect(signUpBtnEl).toHaveTextContent('Sign Up');
  });
  it('should render guest login button successfully', () => {
    const guestLoginBtnEl = screen.getByRole('button', { name: 'Sign Up' });
    expect(guestLoginBtnEl).toBeInTheDocument();
    expect(guestLoginBtnEl).toHaveTextContent('Sign Up');
  });
});

