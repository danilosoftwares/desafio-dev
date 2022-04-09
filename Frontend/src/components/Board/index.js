import { Container } from "./style";

function Board({children}) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Board;