import {
  Container,
  Button,
} from "./styles";

export default function Home() {
  const onClick = () => alert("You clicked me");

  return (
    <Container>
      <h1>NodeJS Boilerplate</h1>

      <Button onClick={ onClick }>Click</Button>
    </Container>
  );
}
