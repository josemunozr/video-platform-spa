import gravatar from '../../utils/gravatar';

test('should ', () => {
  const email = 'jm@gmail.com';
  const gravatarUrl =
    'https://gravatar.com/avatar/c898e0d48bd6242ae01e31f303069be5';

  expect(gravatarUrl).toEqual(gravatar(email));
});
