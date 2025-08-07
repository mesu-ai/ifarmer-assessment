import { baseURL } from '../config/baseURL';

export const getCategories = async () => {
  try {
    const res = await fetch(`${baseURL}/categories`);
    if (!res.ok) throw new Error('Error Featching Data');
    return res.json();
  } catch (error) {
    console.log(error);
  }
};