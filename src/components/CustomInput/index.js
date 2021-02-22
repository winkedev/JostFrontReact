import React from 'react';
import './style.css';

const CustomInput = ({ placeholder, type, id, onChangeEvent, value, icon, onKeyPressEvent }) => {
    return (
        <div class="input-group no-border custom-input-group">
            <span class="input-group-prepend">
                <div class="input-group-text">
                    <i>
                        {icon}
                    </i>
                </div>
            </span>
            <input value={value} onKeyPress={onKeyPressEvent} onChange={onChangeEvent} id={id} type={type} class="form-control" placeholder={placeholder} />
        </div>
    )
}

export default CustomInput;