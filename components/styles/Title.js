import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(5deg) rotate(1deg);
  backface-visibility: hidden;
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
  a {
    background: var(--darkTeal);
    background-clip: padding-box;
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
    border-radius: 10px;
    border-color: white;
    border-style: solid;
    border-width: 3px;
  }
`;

export default Title;
