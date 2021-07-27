import styled from 'styled-components';

const CloseButton = styled.button`
  background: black;
  color: white;
  font-size: 3rem;
  border-radius: 50%;
  border: 0;
  padding-bottom: 6px;
  position: absolute;
  z-index: 2;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`;

export default CloseButton;
