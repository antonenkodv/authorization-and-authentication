export const AccessTokenExample = {
  accessToken: 'eyJhbGciOiJIU...',
};
export const UserWithNoPasswordExample = {
  id: 'cf57857c-9afa-4e46-8b6e-088d8b3c310e',
  name: 'williamhgates',
  email: 'example@gmail.com',
};

export const UserWithTokensExample = {
  user: UserWithNoPasswordExample,
  ...AccessTokenExample,
};
