import styled from "styled-components";

export { default as Button } from "components/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  h1 {
    margin: 0 0 2rem 0;
    font-family: sans-serif;
  }
`;
