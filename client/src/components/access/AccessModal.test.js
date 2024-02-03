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
    let emailInputEl = screen.getByPlaceholderText('Email');
    expect(emailInputEl).toBeInTheDocument();
  });
  it('should render password input successfully', () => {
    let passwordInputEl = screen.getByPlaceholderText('Password');
    expect(passwordInputEl).toBeInTheDocument();
  });
  it('should render login button successfully', () => {
    const loginBtnEl = screen.getByRole('button', { name: /login/i });
    expect(loginBtnEl).toBeInTheDocument();
    expect(loginBtnEl).toHaveTextContent('Login');
  });
  it('should render sign up button successfully', () => {
    let signUpBtnEl = screen.getByRole('button', { name: /sign up/i });
    expect(signUpBtnEl).toBeInTheDocument();
    expect(signUpBtnEl).toHaveTextContent('Sign Up');
  });
  it('should render guest login button successfully', () => {
    let guestLoginBtnEl = screen.getByRole('button', { name: /guest access/i });
    expect(guestLoginBtnEl).toBeInTheDocument();
    expect(guestLoginBtnEl).toHaveTextContent('Guest Access');
  });
});

