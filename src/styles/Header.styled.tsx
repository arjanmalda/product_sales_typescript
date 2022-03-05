import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  font-family: "Source Sans Pro", sans-serif;
  flex-flow: column nowrap;
  font-size: 15px;
  color: #6d7078;
  align-items: center;
  border-bottom: 1px solid #e6e7eb;
  box-sizing: border-box;
  display: flex;
  flex: 0 0 50px;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 40px;
  padding-left: 10px;
  width: 100%;
  height: 50px;
`;

export const HeaderText = styled.div`
  flex: 2;
`;

export const DragDropIcon = styled.div`
  cursor: move;
  padding-left: 18px;
  margin: 5px;
  font-size: 15px;
`;

export const TrashIcon = styled.div`
  margin: 5px;
  font-size: 15px;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;
