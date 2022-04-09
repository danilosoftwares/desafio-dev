import { Container, Cortain } from "./style";

function Message({children, onClick, visible}) {
  const onclick = (e) => {
    onClick(e)
  }

  return (
    visible &&
    <>
      <Cortain onClick={onclick}>
      </Cortain>
      <Container onClick={onclick}>
      {children}
      </Container>
      
    </>
  );
}

export default Message;