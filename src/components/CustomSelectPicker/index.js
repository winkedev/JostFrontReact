import React from 'react';
import './style.css';

import ReactSelect from 'react-select';

const CustomSelectPicker = ({ title, dict, initWithEmptyValue, onChangeEvent, ID, classname, REF }) => {
    return (
        <div className={classname}>
            { dict != null ?
                <div>
                    <label>{title}</label>
                    <ReactSelect
                        ref={REF}
                        isClearable={true}
                        id={ID}
                        options={dict}
                        onChange={onChangeEvent} />
                </div> : ""}
        </div>
    )
}

export default CustomSelectPicker;