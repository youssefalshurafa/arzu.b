import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';

function ProductScreen() {
  const { state, dispatch } = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div>Product not Found</div>;
  }

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
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">
          <h1>Back to Products</h1>
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={704}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.fabric}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div>LE {product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'Instock' : 'Unavailable'}</div>
          </div>
          <button onClick={addToCartHandler} className="primary-button w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;
