import { Widget } from "./styles/Widget.styled";
import React from "react";
import { Container, Logo } from "./styles/Container.styled";
import Draggable from "react-draggable";
import { Wrapper } from "./styles/Wrapper.styled";
import { Stats } from "./components/Stats";
// import { MosTheme } from "@myonlinestore/bricks";

function App() {
  // prevent react Draggable warning
  const nodeRef = React.useRef(null);
  return (
    // <MosTheme>
    <Container>
      <Logo src="logo.png" alt="Logo Mijnwebwinkel" />
      <Draggable nodeRef={nodeRef}>
        <Widget ref={nodeRef}>
          <Wrapper>
            <Stats />
          </Wrapper>
        </Widget>
      </Draggable>
    </Container>
    // </MosTheme>
  );
}

export default App;
