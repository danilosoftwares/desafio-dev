import styled from 'styled-components';

export const Container = styled.div`  
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: absolute;
  left: 25%;
  top: 40%;
  color: white;
  background: #822faf;
  border: 1px solid #47126b;
  box-sizing: border-box;
  border-radius: 8px;  
  padding: 15px;
  width: 50%;
  cursor: pointer; 
`;

export const Cortain = styled.div`  
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
`