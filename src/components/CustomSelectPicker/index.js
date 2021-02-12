import React from 'react';
import './style.css';

const CustomSelectPicker = ({ title, dict, initWithEmptyValue, onChangeEvent }) => {
    return (
        <div>
            {dict != null ?
                <div>
                    <label>{title}</label>
                    <select className="selectpicker form-control" onChange={onChangeEvent}>
                        {initWithEmptyValue ? <option value="" selected disabled></option> : ""}
                        {Object.keys(dict).map((k, v) => {
                            return <option key={dict[v].key} value={dict[v].key}>{dict[v].value}</option>
                        })}
                    </select>
                </div> : ""}
        </div>
    )
}

export default CustomSelectPicker;