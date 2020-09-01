import user from './user';
import login from './login'
import play from './play'
import keep from './keep'

const models = [user, login, play, keep]

export type RootState = {
  user: typeof user.state
  login: typeof login.state
  play: typeof play.state
  keep: typeof keep.state
};

export default models;