import React from 'react';
import './style.css';

import ReactSelect from 'react-select';

const CustomSelectPicker = ({ title, dict, initWithEmptyValue, onChangeEvent, ID, classname, REF }) => {
    return (
        <div className={classname}>
            {/* {dict != null ?
                <div>
                    <label>{title}</label>
                    <select id={ID} className="selectpicker form-control custom-select-picker" onChange={onChangeEvent}>

                        {initWithEmptyValue ? <option key="" value="selectone" selected disabled>Selecione...</option> : ""}
                        {Object.keys(dict).map((k, v) => {
                            return <option key={dict[v].key} value={dict[v].key}>{dict[v].value}</option>
                        })}
                    </select>
                </div> : ""} */}

            { dict != null ?
                <div><label>{title}</label>
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