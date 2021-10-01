import {generateQueryStrFromObject, processFetchRequest} from '../../utils';

const QUOTABLE_BASE_URL = 'https://quotable.io';

/**
 * Get list of quotes
 * @param {object=} params query params as object
 * @returns json response
 */
const getQuotes = async function (params) {
  let url = `${QUOTABLE_BASE_URL}/quotes`;
  if (params) {
    url += generateQueryStrFromObject(params);
  }

  return processFetchRequest(url);
};

export default {
  getQuotes,
  // other methods here
};
