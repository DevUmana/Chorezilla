import auth from "../utils/auth";
import useInterval from "../utils/interval";

const AuthChecker = () => {

  useInterval(() => {
    auth.redirectIfExpired();
  }, 1000);

  return null; 
};

export default AuthChecker;