import { useRef } from "react";
import { Container } from "./style";

function ButtonCustom({children, onClick}) {
  const textInput = useRef(null);

  const onFileChange = event => { 
    onClick(event.target.files[0]);
    textInput.current.value = null;
  }; 

  return (
    <Container>
      <input ref={textInput} id={"contained-button-file"} type="file" onChange={onFileChange} />
      <label htmlFor="contained-button-file">{children}</label>
    </Container>
  );
}

export default ButtonCustom;