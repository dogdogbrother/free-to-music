import user from './user';
import login from './login'

const models = [user, login]

export type RootState = {
  user: typeof user.state;
  login: typeof login.state
};

export default models;