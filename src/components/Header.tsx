import {
  StyledHeader,
  HeaderText,
  DragDropIcon,
  TrashIcon,
} from "../styles/Header.styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscTrash } from "react-icons/vsc";
import { PeriodSelector } from "./PeriodSelector";
import React from "react";
import { IState } from "./Stats";

interface IProps {
  orders: IState["orders"];
  products: IState["products"];
  loading: IState["loading"];
  handleChange: IState["handleChange"];
}

interface handleChangeProps {
  handleChange(
    event: React.ChangeEventHandler<HTMLInputElement> | undefined
  ): void;
}

export const Header: React.FC<IProps> = ({ handleChange }) => {
  return (
    <StyledHeader>
      <HeaderText>Verkoop per product 📈</HeaderText>
      <PeriodSelector
        handleChange={handleChange}
        orders={[]}
        loading={false}
        products={[]}
      />
      <DragDropIcon>
        <GiHamburgerMenu />
      </DragDropIcon>
      <TrashIcon>
        <VscTrash />
      </TrashIcon>
    </StyledHeader>
  );
};
