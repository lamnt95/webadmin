import React, { useState, useMemo } from "react"
import { Input } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import utils from "../utils"

export default function ChooseCalendar({ date, onChange }) {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [calendar, setCalendar] = useState(date);
  const onClickInput = () => {
    setIsShowCalendar(!isShowCalendar)
  }
  const onBlurInput = () => {
    setTimeout(() => {
      setIsShowCalendar(false)
    }, 100)
  }
  const onChooseDate = (value) => {
    setCalendar(value)
    onChange(value);
  }

  const calendarView = useMemo(() => utils.formatYYYMMDD(calendar), [calendar])

  return <div style={{ position: "relative" }}>
    <Input type="text" id="DateFrom" value={calendarView} className="center" onClick={onClickInput} onBlur={onBlurInput} />
    {isShowCalendar && <div style={{ position: "absolute" }}>
      <Calendar
        onChange={onChooseDate}
        value={calendar}
      />
    </div>}
  </div>
}