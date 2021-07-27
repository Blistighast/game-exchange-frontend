import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const CartButton = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const { openCart } = useCart();

  // does MyCart dot animation and opens cart 1s later
  function handleClick() {
    addToCart();
    setTimeout(openCart, 1100);
  }

  return (
    <CartButton disabled={loading} type="button" onClick={handleClick}>
      Add{loading && 'ing'} to Cart 🛒
    </CartButton>
  );
}
