import setAuthToken from './setAuthToken';
import { store } from '../store';
import { loadUser } from '../actions/auth';
import { saveCartFromLocalToState } from '../actions/user/index';

const initialSetup = () => {
  prototypeInit();

  setAuthToken(localStorage.getItem('token'));

  dispatchInit();
};

const prototypeInit = () => {
  String.prototype.fromCamel = function () {
    var result = this.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  Number.prototype.fix = function (f = 2) {
    return +this.toFixed(f);
  };
};
const dispatchInit = () => {
  store.dispatch(loadUser());
  store.dispatch(saveCartFromLocalToState());
};

export default initialSetup;
