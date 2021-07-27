import styled from 'styled-components';

const PriceTag = styled.span`
  background: var(--darkTeal);
  background-clip: padding-box;
  transform: rotate(-5deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -7px;
  left: -5px;
  border-radius: 10px;
  border-color: white;
  border-style: solid;
  border-width: 3px;
`;

export default PriceTag;
