import styled from "styled-components";
// import { keyframes } from "styled-components";

export const SelectorContainer = styled.div`
  font-size: 17px;
  display: flex;

  width: 100px;
  border-radius: 5px;
  box-sizing: border-box; /* Chrome10+,Safari5.1+ */

  position: relative;
  -webkit-box-flex: 1;
  flex-grow: -1;
  flex-basis: auto;

  div {
    display: flex;

    width: 15px;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 31.5px;
    right: 156.5px;
    z-index: 2;
    cursor: pointer;

    &:focus {
      z-index: 2;
      background-color: white;
      transform: rotate(180deg);
    }

    &svg {
      bottom: 5px;
      color: black;
    }
  }
`;

export const Selector = styled.select`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 15px;
  height: 100%;
  border: 1px solid rgb(211, 213, 217);
  padding-left: 2px;
  outline: none;
  position: relative;
  -webkit-box-flex: 1;
  flex-grow: -1;
  border-radius: 5px;
  width: fit-content;
  display: flex;
  flex-basis: auto;
  box-sizing: border-box;
  margin-left: -50px;
  color: #6d7078;
  background-color: transparent;

  &:hover {
    color: black;
    transition: color 150ms;
    cursor: pointer;
  }
  &:focus {
    box-shadow: rgb(193 246 198 / 88%) 0px 0px 0px 2.5px;
    transition: box-shadow 1500ms cubic-bezier(0.25, 0.1, 0.21, 1.08) 0s;
  }

  option {
    &:hover {
      background: #000 !important;
    }
    font-size: 15px;
  }
`;

//  font-family: "Source Sans Pro", sans-serif;
//   font-size: 20px;
//   transition: width 150ms;
//   outline: none;
//
//   border-radius: 5px;
//   width: 100px;
//   display: flex;

//   &:focus {
//     border-color: #6bde79;
//     transition: color 150ms;
//   }

//   &:hover {
//     color: #6bde79;
//     transition: color 150ms;
//     transition-delay: 500ms;
//   }

//   option {
//   }
