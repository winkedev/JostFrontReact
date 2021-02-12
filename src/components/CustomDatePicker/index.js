import React from 'react';
import './style.css';
import DatePicker from 'react-date-picker';

const CustomDatePicker = ({ title, startdate, value, onChangeEvent, }) => {
    return (
        <div>
            <label>{title}</label>
            <DatePicker startDate={startdate} onChange={onChangeEvent} value={value} />
        </div>
    )
}

export default CustomDatePicker;