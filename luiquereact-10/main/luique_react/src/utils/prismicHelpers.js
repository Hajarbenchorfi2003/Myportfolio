import { client } from "../prismic";

export const fetchPrismicContent = async (documentType) => {
  const response = await client.getByType(documentType);
  return response?.results;
};