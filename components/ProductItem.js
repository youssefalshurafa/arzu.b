/* eslint-disable @next/next/no-img-element */
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

function ProductItem({ product }) {
  const { data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <div className="card ">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>

      <div className="flex flex-col p-5 items-center justify-center ">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <Link href={`/category/${product.category}`}>
          <p className="mb-2">{product.category}</p>
        </Link>

        <p>LE {product.price}</p>
        {session ? (
          <button onClick={addToCartHandler} className="primary-button">
            Add to Cart
          </button>
        ) : (
          <button className="rounded cursor-not-allowed bg-gray-300 py-2 px-4 shadow outline-none">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
