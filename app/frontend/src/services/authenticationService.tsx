import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export module authenticationService {

    export function login(username: string, password: string) {
        return axios.post(`${BASE_URL}/api/auth/signin/credentials`, {
            'identifier': username,
            'password': password
        }).then(result => result.data);
    }

    export function register(username: string, password: string, email: string, name: string, surname: string) {
        return axios.post(`${BASE_URL}/api/auth/signup`, {
            'identifier': username,
            'password': password,
            'email': email,
            'firstName': name,
            'lastName': surname
        }).then(result => result.data);
    }

    export function isAuthenticated(): boolean {
        return (localStorage.getItem('token') !== null);
    }
}