/* eslint-disable @next/next/no-img-element */
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';

import Product from '../models/Product';
import db from '../utils/db';

export default function Home({ products }) {
  return (
    <Layout>
      <div className="relative">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
          <div>
            <img
              loading="lazy"
              src="https://image.s5a.com/is/image/saks/122022_WMHP_HERO_SH_NEWYEARSHOES_SLIDER_1?scl=1&qlt=84&fmt=jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              src="https://image.s5a.com/is/image/saks/122022_WMHP_HERO_HB_STANDOUTBAGS_SLIDER_2?scl=1&qlt=83&fmt=jpg"
              alt=""
            />
          </div>
          <div>
            <img
              loading="lazy"
              src="https://image.s5a.com/is/image/saks/122022_WMHP_HERO_AW_SAINTLAURENT_SLIDER_3?scl=1&qlt=84&fmt=jpg"
              alt=""
            />
          </div>
        </Carousel>
      </div>
      <div className="text-xl font-bold font-serif pt-2  border-b border-solid border-2 border-black border-t-0 border-x-0">
        <h1>Featured Products</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 space-x-2 pt-4">
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
