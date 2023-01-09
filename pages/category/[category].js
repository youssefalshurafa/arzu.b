import Link from 'next/link';
import Layout from '../../components/Layout';
import ProductItem from '../../components/ProductItem';
import Product from '../../models/Product';
import db from '../../utils/db';

export default function CategoryScreen({ product }) {
  if (!product) {
    return <div>Product not Found</div>;
  }

  return (
    <Layout title={product.category}>
      <div className="py-2">
        <Link href="/">
          <h1>Back to Products</h1>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {product.map((product) => (
          <ProductItem product={product} key={product.slug}></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;
  await db.connect();
  const product = await Product.find({ category }).lean();
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
