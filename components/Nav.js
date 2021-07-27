import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import CartCount from './CartCount';

const navVariants = {
  initial: {
    x: '11vw',
    opacity: 0,
    rotateY: 90,
  },
  animate: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function Nav() {
  const user = useUser();
  const { toggleCart } = useCart();
  return (
    <NavStyles
      as={motion.ul}
      variants={navVariants}
      animate="animate"
      initial="initial"
    >
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          {/* <Link href="/account">Account</Link> */}
          <SignOut />
          <button type="button" onClick={toggleCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                // need to confirm if cartItem exists
                (tally, cartItem) =>
                  tally + (cartItem.product ? cartItem.quantity : 0),
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
