import { sendGetRequest } from "../../services";

export const getListSearchHistory = async () => {
  return sendGetRequest(`/api/poc/v1/search/cases`);
};
