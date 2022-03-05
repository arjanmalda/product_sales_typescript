import styled from "styled-components";
// import { keyframes } from "styled-components";

// const rotate = keyframes`
// 0% {
//   transform: rotate(0deg);
// }

// 100% {
//   transform: rotate(360deg);
// }
// `;

export const StyledStats = styled.div`
  padding-left: 10px;
  th {
    top: -5px;
    border-bottom: 1px solid #e6e7eb;
  }

  table {
    width: 525px;
  }

  th:first-child {
    width: 330px;
  }
  th:nth-child(2) {
    width: 32px;
    padding-left: 30px;
  }
  th:nth-child(3) {
    width: 94px;
    padding-left: 30px;
  }

  td:first-child {
    padding-right: 25px;
    /* width: 65vw; */
    max-height: 1vh;
    max-width: 330px;
  }
  img {
    height: 60px;
    width: 60px;
    object-fit: contain;
  }

  .count {
    padding-left: 30px;
    width: 93px;
  }

  a {
    text-decoration: none;
    color: #6d7078;
  }
  a:hover {
    color: #6bde79;
  }
  .noProductError {
    background: #ffc5d4;
    border-radius: 6px;
    color: #b00d37;
    padding: 1rem;
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.2rem;
    max-width: 20vw;
  }
  .noProductError a {
    color: #b00d37;
    text-decoration: underline;
  }
`;

export const TableHeader = styled.tr`
  text-align: left;
  sup {
    cursor: context-menu;
  }
  div {
    max-height: fit-content;

    display: none;
    z-index: 3;
  }

  sup:hover + div {
    font-size: 0.7rem;
    border: 1px solid #e6e7eb;
    border-radius: 6px;
    position: fixed;
    display: block;
    background-color: #6bde79;
    z-index: 2;
    color: white;
    padding: 0.75rem;
    line-height: normal;
  }
`;

export const SkeletonText = styled.span`
  user-select: none;
  background-color: rgba(0, 0, 0, 0.03);
  background-image: linear-gradient(
    100deg,
    transparent,
    rgba(0, 0, 0, 0.02),
    transparent
  );
  background-repeat: no-repeat;
  background-size: 200px 100%;
  animation: 3s ease 0s infinite normal none running;
  border-radius: 3px;
  color: transparent;
  display: inline-block;
  height: 15px;
  margin: calc(3.75px) 0px;
  width: 330px;
`;

export const SkeletonImg = styled.span`
  display: block;
  position: relative;
  overflow: hidden;
  user-select: none;
  color: transparent;
  margin: 10px;
  /* background-size: 200px 100%; */
  height: 50px;
  width: 32px;
  padding-left: 30px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.03);
`;

export const SkeletonNum = styled.span`
  user-select: none;
  background-color: rgba(0, 0, 0, 0.03);
  background-image: linear-gradient(
    100deg,
    transparent,
    rgba(0, 0, 0, 0.02),
    transparent
  );
  background-repeat: no-repeat;
  background-size: 200px 100%;
  animation: 3s ease 0s infinite normal none running;
  border-radius: 3px;
  color: transparent;
  display: inline-block;
  height: 15px;
  margin: calc(3.75px) 0px;
  width: 94px;
  padding-left: 30px;
`;

export const TableBody = styled.tbody``;
