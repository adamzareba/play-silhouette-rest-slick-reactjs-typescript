import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export module exampleDataService {

    export function getColors() {
        const url = `${BASE_URL}/colors`;
        return axios.get(url).then(response => response.data);
    }

    export function getBadPassword(token: string) {
        const url = `${BASE_URL}/badPassword`;
        return axios.get(url, {
            headers: {
                'X-Auth-Token': token
            }
        }).then(response => response.data);
    }
}