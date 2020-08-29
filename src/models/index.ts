import user from './user';
import login from './login'
import play from './play'

const models = [user, login, play]

export type RootState = {
  user: typeof user.state;
  login: typeof login.state
  play: typeof play.state
};

export default models;