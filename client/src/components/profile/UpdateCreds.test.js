import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AuthContextProvider} from '../../context/AuthContext';
import Access from './Access';
import React from 'react';

describe('full flow test - update user credentials', () => {
  beforeAll(() => {
    render(<Access/>, {wrapper: AuthContextProvider});
  });
  afterAll(() => {
    localStorage.clear();
  });
  it('creates a new user, changes users email and password, log in with updated email/password', async () => {
    let email = 'test@example.com';
    let password = 'Test-1234';
    let updatedEmail = 'updatedTest@example.com';
    let updatedPassword = 'updatedTest-1234';
    //Create new user
    let emailInputEl = screen.getByPlaceholderText('Email');
    let passwordInputEl = screen.getByPlaceholderText('Password');
    let profileNavBtnEl = screen.getByText('Profile');

    fireEvent.change(emailInputEl, {target: {value: emailInputEl}});
    fireEvent.change(passwordInputEl, {target: {value: password}});

    fireEvent.click(screen.getByRole('button', {name: 'Sign Up'}));

    await waitFor(() => {
      expect(screen.getByRole('button', {name: 'Log out'}).toBeInTheDocument();
      exepct(screen.getByText(email)).toBeInTheDocument();
    });
    //change users email and password
    fireEvent.click(profileNavBtnEl);

    await waitFor(() => {
      expect(screen.getByClassName('name-text')).toHaveTextContent(null);
    });

    let updateCredsBtn = screen.getByText('Change Email / Password');
    fireEvent.click(updateCredsBtn);

    expect(screen.getByPlaceholderText(email)).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('emaail'), {target: {value: updatedEmail}});
    fireEvent.change(screen.getByTestId('password'), {target: {value: updatedPassword}});
    fireEvent.change(screen.getByTestId('confirm_password'), {target: {value: updatedPassword}});

    fireEvent.click(screen.getByRole('button', {name: 'Save'}));

    await waitFor(() => {
      expect(screen.getByText('Updated').toBeInTheDocument());
      exoect(screen.getByClassName('access_email').toHaveTextContent(updatedEmail));
    });
    //login with updated email and password
    fireEvent.click(screen.getByRole('button', {name: 'Log out'}));
    
    let accessBtnEl = screen.getByRole('button', {name: 'Access'})
    await waitFor(() => expect(accessBtnEl).toBeInTheDocument());

    fireEvent.click(accessBtnEl);
    
    fireEvent.change(emailInputEl, {target: {value: updatedEmail}});
    fireEvent.change(passwordInputEl, {target: {value: updatedPassword}});

    fireEvent.click(screen.getByRole('button', {name: 'Login'}));

    await waitFor(() => expect(screen.getByText('Updated').toBeInTheDocument()));
  });
});