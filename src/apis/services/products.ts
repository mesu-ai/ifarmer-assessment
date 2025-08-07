import { baseURL } from '../config/baseURL';

export const getProducts = async () => {
  try {
    const res = await fetch(`${baseURL}/products`);
    if (!res.ok) throw new Error('Error Featching Data');
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
