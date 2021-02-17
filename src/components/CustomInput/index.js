import React from 'react';
import './style.css';

const CustomInput = ({ placeholder, type, id, onChangeEvent, value, icon }) => {
    return (
        <div class="input-group no-border custom-input-group">
            <span class="input-group-prepend">
                <div class="input-group-text">
                    <i>
                        {icon}
                    </i>
                </div>
            </span>
            <input value={value} onChange={onChangeEvent} id={id} type={type} class="form-control" placeholder={placeholder} />
        </div>
    )
}

export default CustomInput;