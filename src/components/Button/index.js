import styled from "styled-components";

const Button = styled.button`
  border: 0;
  margin: 0;
  border-radius: 6px;
  height: 45px;
  width: 120px;
  background: ${({ theme }) => theme.primary };
  color: ${({ theme }) => theme.text.light };
`;

export default Button;
