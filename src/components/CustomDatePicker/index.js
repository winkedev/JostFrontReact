import React from 'react';
import './style.css';
import DatePicker from 'react-date-picker';

const CustomDatePicker = ({ title, startdate, value, onChangeEvent, }) => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <label>{title}</label>
            <DatePicker startDate={startdate} onChange={onChangeEvent} value={value} />
        </div>
    )
}

export default CustomDatePicker;