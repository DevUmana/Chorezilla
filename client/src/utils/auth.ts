import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  redirectIfNotLoggedIn(navigate: Function) {
    if (!this.loggedIn()) {
      localStorage.removeItem('id_token');
      navigate('/login');
      return true;
    }
  }

  redirectIfExpired() {
    if (this.isTokenExpired(this.getToken())) {
      localStorage.removeItem('id_token');
      window.location.assign('/login');
      return true;
    }
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
