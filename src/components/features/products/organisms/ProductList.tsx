'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { deleteProduct } from '@/apis/services/products';
import { ProductProps } from '@/types/types';
import Link from 'next/link';
import Alert from '@/components/ui/Alert';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const productHeaders = ['SN', 'Image', 'Title', 'Category', 'Price', 'Actions'];

const ProductList: FC<{ products: ProductProps[]; onProductDeleted?: () => void }> = ({ 
  products, 
  onProductDeleted 
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type: 'success' as 'success' | 'error',
    message: ''
  });
  const [productToDelete, setProductToDelete] = useState<ProductProps | null>(null);

  const handleEdit = (productId: number) => {
    router.push(`/assignment-2/edit?id=${productId}`);
  };

  const handleDelete = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setProductToDelete(product);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setDeletingId(productToDelete.id);
    try {
      await deleteProduct(productToDelete.id);
      setAlertConfig({
        type: 'success',
        message: 'Product deleted successfully!'
      });
      setShowAlert(true);
      
      // Refresh the products list
      if (onProductDeleted) {
        onProductDeleted();
      } else {
        // Fallback: refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setAlertConfig({
        type: 'error',
        message: 'Failed to delete product. Please try again.'
      });
      setShowAlert(true);
    } finally {
      setDeletingId(null);
      setProductToDelete(null);
    }
  };

  return (
    <>
      <div className='h-[70vh] overflow-auto'>
        {products.length === 0 ? (
          <div className='text-center text-gray-500 py-8'>No products found</div>
        ) : (
          <div className='min-w-full'>
            <table className='w-full bg-white rounded-lg overflow-hidden shadow-sm'>
              <thead className='bg-gray-50 sticky top-0'>
                <tr>
                  {productHeaders.map((header) => (
                    <th
                      key={header}
                      className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className='hover:bg-gray-50 transition-colors duration-150'
                  >
                    <td className='py-4 px-4 text-sm text-gray-900'>
                      {index + 1}
                    </td>
                    <td className='py-4 px-4'>
                      <div className='relative w-16 h-16 rounded-lg overflow-hidden'>
                        <Image
                          src={product?.images[0] || '/placeholder-image.jpg'}
                          alt={product.title}
                          fill
                          className='object-cover'
                        />
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <div className='max-w-xs'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                          <Link className='hover:text-blue-600' href={`/assignment-2/product/${product.id}`}>{product.title}</Link>
                        </p>
                        <p className='text-sm text-gray-500 line-clamp-2 mt-1'>
                          {product.description}
                        </p>
                      </div>
                    </td>
                    <td className='py-4 px-4'>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                        {product.category.name}
                      </span>
                    </td>
                    <td className='py-4 px-4 text-sm font-semibold text-green-600'>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className='py-4 px-4'>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => handleEdit(product.id)}
                          type='button'
                          className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer'
                          disabled={deletingId === product.id}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          type='button'
                          className='inline-flex items-center px-3 py-1.5 text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer'
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Product"
        message={productToDelete ? `Are you sure you want to delete "${productToDelete.title}"? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Alert Dialog */}
      <Alert
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertConfig.message}
        type={alertConfig.type}
        autoClose={true}
        autoCloseDelay={3000}
      />
    </>
  );
};

export default ProductList;
