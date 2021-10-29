import axios from 'axios';


export type ApiClient = {
    getProperties: (s: string[]) => Promise<string[]>;
}

/** get tickets with search and page queries */
export const createApiClient = (): ApiClient => {
    return {
        getProperties: async (s: string[]) => {
            const res = await axios.get('/', { params: {categories: s} });
            return res.data;
        }
    }
}


