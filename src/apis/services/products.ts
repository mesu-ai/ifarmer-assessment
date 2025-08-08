import axios from 'axios';
import { baseURL } from '../config/baseURL';
import { CreateProductProps } from '@/types/types';

interface queryParams {
  categoryId?: number | string | undefined;
  limit?: number | string | undefined;
  offset?: number | string | undefined;
  title?: string | undefined;
}

interface UpdateProductData {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export const getProducts = async (query: queryParams) => {
  try {
    const res = await axios.get(`${baseURL}/products`, { params: query });
    if (res.status !== 200) throw new Error('Error fetching products');
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductById = async (id: number | string) => {
  try {
    const res = await axios.get(`${baseURL}/products/${id}`);
    if (res.status !== 200) throw new Error('Error fetching product');
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createProduct = async (productData: CreateProductProps) => {
  try {
    const res = await axios.post(`${baseURL}/products`, productData);
    if (res.status !== 201) throw new Error('Error creating product');
    console.log('Product created successfully:', res);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateProduct = async (id: number | string, productData: UpdateProductData) => {
  try {
    const res = await axios.put(`${baseURL}/products/${id}`, productData);
    if (res.status !== 200) throw new Error('Error updating product');
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = async (id: number | string) => {
  try {
    const res = await axios.delete(`${baseURL}/products/${id}`);
    if (res.status !== 200) throw new Error('Error deleting product');
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
