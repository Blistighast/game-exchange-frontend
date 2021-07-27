import styled from 'styled-components';
import Cart from './Cart';

import Nav from './Nav';
import Search from './Search';
import Logo from './Logo';

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--purple);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--purple);
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo />
        <Nav />
      </div>
      <div className="sub-bar">
        <Search />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
