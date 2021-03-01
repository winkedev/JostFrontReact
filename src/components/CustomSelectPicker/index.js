import React from 'react';
import './style.css';

import ReactLoading from 'react-loading';

const CustomSelectPicker = ({ title, dict, initWithEmptyValue, onChangeEvent, ID, classname }) => {
    return (
        <div className={classname}>
            {dict != null ?
                <div>
                    <label>{title}</label>
                    <select id={ID} className="selectpicker form-control" onChange={onChangeEvent}>

                        {initWithEmptyValue ? <option key="" value="selectone" selected disabled>Selecione...</option> : ""}
                        {Object.keys(dict).map((k, v) => {
                            return <option key={dict[v].key} value={dict[v].key}>{dict[v].value}</option>
                        })}
                    </select>
                </div> : ""}
        </div>
    )
}

export default CustomSelectPicker;