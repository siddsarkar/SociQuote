import requesthandler from '../requestHandler';

const AIRTABLE_BASE = 'appikp0oubt89KWGW'; // quoted app base
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE}`;
const AIRTABLE_API_KEY = 'keyZXKPvGAfYaTQKY';

/**
 * ?AIRTABLE API INTERFACE
 */
export default {
  /**
   * Get a table within base
   * @param {{airtable_api_key: string, table: string}} options api key and record data
   * @returns table records
   */
  getTable: async function ({
    airtable_api_key = AIRTABLE_API_KEY,
    table,
    params,
  }) {
    let queryStr = '';
    if (params) {
      queryStr = Object.keys(params)
        .map((key, idx) => {
          if (idx === 0) {
            return `?${key}=${params[key]}`;
          }
          return `&${key}=${params[key]}`;
        })
        .join('');
    }
    const url = `${AIRTABLE_BASE_URL}/${table}${queryStr}`;
    return requesthandler(url, {
      method: 'GET',
      headers: {Authorization: `Bearer ${airtable_api_key}`},
    });
  },

  /**
   * Creates a record on specified base and table
   * @param {{airtable_api_key: string, table: string, record: object}} options apikey, name of table, record
   * @returns saved record
   */
  createRecord: async function ({
    airtable_api_key = AIRTABLE_API_KEY,
    table,
    record,
  }) {
    const url = `${AIRTABLE_BASE_URL}/${table}`;
    return requesthandler(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${airtable_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
  },

  /**
   * Updates a record
   * @param {{airtable_api_key: string, table: string, record: object}} options apikey, table name and updated record object
   * @returns updated record
   */
  updateRecord: async function ({
    airtable_api_key = AIRTABLE_API_KEY,
    table,
    record,
  }) {
    const url = `${AIRTABLE_BASE_URL}/${table}`;
    return requesthandler(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${airtable_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({records: [record]}),
    });
  },

  /**
   * Retrive user record if any
   * @param {{airtable_api_key: string, user: object}} options apikey and firebase user object
   * @returns users with the firebase user id
   */
  getUser: async function ({airtable_api_key = AIRTABLE_API_KEY, user}) {
    const url = `${AIRTABLE_BASE_URL}/users?filterByFormula=id=${user.id}`;
    return requesthandler(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${airtable_api_key}`,
        'Content-Type': 'application/json',
      },
    });
  },

  /**
   * Sign Up a User
   * @param {{airtable_api_key: string, user: object}} options api key and user object
   * @returns user from airtable
   */
  signupUser: async function ({airtable_api_key = AIRTABLE_API_KEY, user}) {
    const url = `${AIRTABLE_BASE_URL}/users`;
    const body = user.photo
      ? JSON.stringify({fields: {...user, photo: [{url: user.photo}]}})
      : JSON.stringify({fields: {...user}});
    return requesthandler(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${airtable_api_key}`,
        'Content-Type': 'application/json',
      },
      body,
    });
  },
};
