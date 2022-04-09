import styled from 'styled-components';

export const Container = styled.label`  
  all: unset;
  background: #7F56D9;
  border: 1px solid #7F56D9;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  padding: 15px;
  cursor: pointer;

  > input {
    visibility: hidden;
    height: 0px;
    width: 0px;
  }
  
  > label {
    //font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    cursor: pointer;
  }
`;