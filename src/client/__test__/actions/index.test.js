import movieMock from '../../__mocks__/movieMock';
import { setFavorite, loginRequest } from '../../actions';

describe('Actions', () => {
  test('action SetFavorite', () => {
    const payload = movieMock;
    const expectedAction = {
      type: 'SET_FAVORITE',
      payload,
    };

    expect(setFavorite(payload)).toEqual(expectedAction);
  });

  test('action LoginRequest', () => {
    const payload = {
      email: 'jm@gmail.com',
      password: 'password',
    };
    const expectedAction = {
      type: 'LOGIN_REQUEST',
      payload,
    };

    expect(loginRequest(payload)).toEqual(expectedAction);
  });
});
