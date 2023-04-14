const tokenKey = 'token-ingesoft';

export function getAuthenticationToken() {
    return localStorage.getItem(tokenKey);
}

export function setAuthenticationToken(token = '') {
    return localStorage.setItem(tokenKey, token);
}

export function removeAuthenticationToken() {
    return localStorage.removeItem(tokenKey);
}