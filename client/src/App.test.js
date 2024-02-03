import React from 'react';
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import { AuthContextProvider } from './context/AuthContext';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


describe('Integratrion - Save Location', () => {
  beforeAll(() => {
    global.navigator.geolocation = {
      // eslint-disable-next-line no-unused-vars
      getCurrentPosition: jest.fn().mockImplementation((success, failure) => {
        success({
          coords: {
            latitude: 35.6895,
            longitude: 139.6917,
          }
        });
      })
    };
  });
  
  afterAll(() => {
    localStorage.clear();
  });
  it('allows user to log in, save a location, check it in the library and then delete it', async () => {
    let location = 'Korea';
    const consoleSpy = jest.spyOn(console, 'log');
    render(<App />, {wrapper: AuthContextProvider});
    //Login with an authenticated user
    fireEvent.click(screen.getByRole('button', {name: /access/i}));
    fireEvent.click(screen.getByRole('button', {name: /guest access/i}));

    await waitFor(() =>  expect(screen.getByRole('button', {name: /log out/i})).toBeInTheDocument());
    //Save a locaxtion
    const locationInput = await screen.findByPlaceholderText('Enter location');
    fireEvent.change(locationInput, { target: { value: location } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() =>expect(screen.getByText('Korea')).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', {name: /add to library/i}));
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('200 Location Saved');
    });
    //Check for saved location 
    fireEvent.click(screen.getByRole('button', {name: 'Library'}));

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Library' })).toBeInTheDocument());

    expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'), { timeout: 5000 });

    await waitFor (() => expect(screen.getByText('Korea')).toBeInTheDocument());
    //Delete most recent saved location
    const targetCityNameCell = screen.getByText('Korea');
    const tableRow = targetCityNameCell.closest('tr');
    const trashIcon = within(tableRow).getByTestId('trash-icon');

    fireEvent.click(trashIcon);
    await waitForElementToBeRemoved(() => screen.getByText('Korea'), {timeout: 5000});

    expect(targetCityNameCell).not.toBeInTheDocument();

    //Re-fetch to check for saved location to be deleted
    fireEvent.click(screen.getByRole('button', {name: 'Dashboard'}));

    fireEvent.click(screen.getByRole('button', {name: 'Library'})); 
    await waitForElementToBeRemoved(() => screen.getByTestId('loading-spinner'), { timeout: 5000 });
    expect(targetCityNameCell).not.toBeInTheDocument();
  }, 20000);

});

// describe('integration - update credentials of authenticated user' , () => {
//   it('allows user to log in, change their password, and log back in with the updated credentials', () => {
//     render(<App/>, {wrapper: AuthContextProvider});

//     fireEvent.click(screen.getByRole('button', {name: /access/i}));

//     fireEvent.change(screen.getByPlaceholderText('Email'), {target: { value: 'test@example.com'}});
//   });
// });