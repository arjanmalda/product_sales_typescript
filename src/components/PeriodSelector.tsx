import { Selector, SelectorContainer } from "../styles/PeriodSelector.styled";
import { useState, useEffect } from "react";
import { IState } from "./Stats";
import React from "react";

interface Props {
  orders: IState["orders"];
  products: IState["products"];
  loading: IState["loading"];
  handleChange: IState["handleChange"];
}

// interface handleChangeProps {
//   handleChange(
//     event: React.ChangeEventHandler<HTMLSelectElement> | undefined
//   ): void;
// }

// import { Select } from "@myonlinestore/bricks";
// initialize periods
const today = new Date();
const dd: string | number = String(today.getDate()).padStart(2, "0");
const mm: string | number = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
const yyyy: number = today.getFullYear();
const currentDay: string = `${yyyy}-${mm}-${dd}`;
const date = new Date();
const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();
let numberOfMonthDays: number;

export const PeriodSelector: React.FC<Props> = ({ handleChange }) => {
  const [lastWeek, setLastWeek] = useState(currentDay);
  const [lastMonth, setLastMonth] = useState(currentDay);
  const [lastYear, setLastYear] = useState(currentDay);

  useEffect(() => {
    getLastYear();
    getLastMonth();
    daysInLastMonth(currentMonth, currentYear);
    getLastWeek();
  });

  const getLastYear = () => {
    let calculateLastYear;
    if (+dd < 10) {
      calculateLastYear = calculateLastYear = `${yyyy - 1}-${mm}-${dd}`;
    } else {
      calculateLastYear = `${yyyy - 1}-${mm}-${dd}`;
    }

    setLastYear(calculateLastYear);
  };

  // calculate number of days of last month
  function daysInLastMonth(month: number, year: number) {
    if (month < 2) {
      numberOfMonthDays = new Date(year - 1, 11, 0).getDate();
    } else {
      numberOfMonthDays = new Date(year, month - 1, 0).getDate();
    }
  }

  const getLastMonth = () => {
    let calculateLastMonth;
    if (+mm < 2) {
      calculateLastMonth = `${yyyy - 1}-12-${dd}`;
    } else if (+dd < 10) {
      calculateLastMonth = `${yyyy}-0${+mm - 1}-${dd}`;
    } else {
      calculateLastMonth = `${yyyy}-0${+mm - 1}-${dd}`;
    }
    setLastMonth(calculateLastMonth);
  };

  const getLastWeek = () => {
    let calculateLastWeek;
    const deducter = +dd - 7;
    const monthDay = numberOfMonthDays + deducter;

    // calculate last week if current date === earlier than january 8
    if (+dd < 8 && +mm < 2) {
      calculateLastWeek = `${yyyy - 1}-12-${monthDay}`;
      // calculate last week if current date === earlier than 8th day of any other month than january
    } else if (+dd < 7) {
      calculateLastWeek = `${yyyy}-0${+mm - 1}-${monthDay}`;
      // calculate last week if current date === later than 16th day of the month
    } else if (+dd > 16) {
      calculateLastWeek = `${yyyy}-${mm}-${deducter}`;
    } else {
      calculateLastWeek = `${yyyy}-${mm}-${deducter}`;
    }

    setLastWeek(calculateLastWeek);
  };

  return (
    <SelectorContainer>
      <Selector onChange={handleChange}>
        <option value={`start_date=${currentDay}`}>Selecteer periode</option>
        <option value={`start_date=${lastWeek}`}>Afgelopen week</option>
        <option value={`start_date=${lastMonth}`}>Afgelopen maand</option>
        <option value={`start_date=${lastYear}`}>Afgelopen jaar</option>
      </Selector>
    </SelectorContainer>
  );
};
