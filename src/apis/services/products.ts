import axios from 'axios';
import { baseURL } from '../config/baseURL';

interface queryParams {
  categoryId?: number | string | undefined;
  limit?: number | string | undefined;
  offset?: number | string | undefined;
}

export const getProducts = async (query: queryParams) => {
  try {
    const res = await axios.get(`${baseURL}/products`, { params: query });
    if (res.status !== 200) throw new Error('Error fetching products');
    const data = res.data;
    return data;
    //   const res = await fetch(`${baseURL}/products`);
    //   if (!res.ok) throw new Error('Error Featching Data');
    //   return res.json();
  } catch (error) {
    console.log(error);
  }
};
