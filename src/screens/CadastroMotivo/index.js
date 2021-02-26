import React from 'react';
import './style.css';

import CustomSelectPicker from '../../components/CustomSelectPicker';

const CadastroMotivo = () => {

    return (
        <div className="cadastro-motivo-container">
            <div className="cadastro-motivo-wrap">
                <h4>Cadastra Motivos</h4>
                <div className="cadastro-motivo-inputs">
                    <div>
                        <input type="text" placeholder="" class="form-control dropdown-toggle" id="myInputId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div class="dropdown-menu" aria-labelledby="myInputId">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroMotivo;