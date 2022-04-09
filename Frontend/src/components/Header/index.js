import { Container } from "./style";

function Header({children}) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Header;