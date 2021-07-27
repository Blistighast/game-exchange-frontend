import Link from 'next/link';
import styled from 'styled-components';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LogoStyles = styled(motion.h1)`
  font-size: 4rem;
  margin-left: 2rem;
  margin-right: 1rem;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  /* transform: skew(-10deg); */
  background: linear-gradient(to left, var(--purple), var(--darkTeal));
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  }
`;

const logoVariants = {
  initial: {
    y: '-11vw',
    opacity: 0,
    rotateX: 480,
  },
  animate: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    skewX: '-10deg',
    transition: {
      duration: 1,
    },
  },
};

export default function Logo() {
  return (
    <LogoStyles variants={logoVariants} initial="initial" animate="animate">
      <div>
        <Link href="/">Game Exchange</Link>
      </div>
    </LogoStyles>
  );
}
