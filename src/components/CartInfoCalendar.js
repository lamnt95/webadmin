import React, { useState, useMemo } from "react"
import { Input, Button } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import utils from "../utils"
import styled from "styled-components"

const Container = styled.div`
  .calendar {
    position: absolute;
    top: 50px;
  }
`;


export default function CartInfoCalendar({ date, onChange, isDisable, msg }) {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [calendar, setCalendar] = useState(date);
  const onClickInput = () => {
    setIsShowCalendar(!isShowCalendar)
  }
  const onBlurInput = () => {
    setTimeout(() => {
      setIsShowCalendar(false)
    }, 200)
  }
  const onChooseDate = (value) => {
    setCalendar(value)
    onChange(value);
  }

  const calendarView = useMemo(() => calendar != null ? utils.formatDate(calendar) : msg, [calendar])
  console.log("calendarView", calendarView)
  return <Container className="cart_info_item_calendar" style={{ flexDirection: "row", display: "flex", position: "relative" }} >
    <Input type="text" id="DateFrom" value={calendarView} className="center" onClick={onClickInput} disabled={isDisable} />
    <Button style={{ marginLeft: "10px" }} onClick={() => onChooseDate(null)}>X</Button>
    {isShowCalendar && <Button style={{ marginLeft: "10px" }} onClick={onBlurInput}>Tắt</Button>}
    {isShowCalendar && <div className="calendar">
      <Calendar
        onChange={onChooseDate}
        value={calendar}
      />
    </div>}
  </Container>
}