import axios from 'axios';
import {SERVER_PATH, SERVER_PATH_CHOICES} from './APIConstants'

export type ApiClient = {
    getProperties: (client_categories: object[][]) => Promise<object[][]>;
}

export type ApiClientChoices = {
    getProperties: (equivalent_choices: object[][]) => Promise<object[][]>;
}


/** get tickets with search and page queries */
export const createApiClient = (): ApiClient => {
    return {
        getProperties: async (client_categories: object[][]) => {
            const res = await axios.get(SERVER_PATH, { params: { client_categories: client_categories } });
            return res.data;
        }
    }
}

export const createApiClientChoices = (): ApiClientChoices => {
    return {
        getProperties: async (equivalent_choices: object[][]) => {
            const res = await axios.get(SERVER_PATH_CHOICES, { params: { equivalent_choices: equivalent_choices } });
            return res.data;
        }
    }
}


export default createApiClient

