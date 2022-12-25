/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>

      <div className="flex flex-col p-5 items-center justify-center">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <Link href={`/category/${product.category}`}>
          <p className="mb-2">{product.category}</p>
        </Link>

        <p>LE {product.price}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
