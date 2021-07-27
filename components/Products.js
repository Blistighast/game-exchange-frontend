import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';
import { RotateYVariants } from './styles/AnimationVariants';

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage, // skip this many products per fetch
      first: perPage, // fetch the first perPage amount of products you see after skipping
    },
  });
  if (loading) return null;
  if (error) return <p>Error: ${error.message}</p>;

  return (
    <div>
      <ProductsListStyles
        as={motion.div}
        variants={RotateYVariants}
        initial="initial"
        animate="animate"
      >
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
