import jwt_decode from 'jwt-decode';

export const isValidToken = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const isAuth = token && isAuthenticated;
    if (!isAuth) return false;
    try {
        const jwt = jwt_decode(token);
        return Date.now() / 1000 < jwt.exp;
    } catch (e) {
        return false;
    }
};