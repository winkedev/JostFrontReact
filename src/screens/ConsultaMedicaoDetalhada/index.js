import React from 'react';
import './style.css';

import CustomTable from '../../components/CustomTable';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const columns = [
        {
            dataField: "posicao",
            text: "Posição",
            editable: false
        },
        {
            dataField: "tipo",
            text: "Tipo",
            editable: false
        },
        {
            dataField: "caracteristica",
            text: "Característica",
            editable: false
        },
        {
            dataField: "class",
            text: "Class",
            editable: false
        },
        {
            dataField: "limite",
            text: "Limites",
            editable: false
        },
        {
            dataField: "numeroMedicao",
            text: "N°Medição",
            editable: false
        },
        {
            dataField: "valorMedido",
            text: "ValorMedido",
            editable: false
        },
        {
            dataField: "descricaoTipo",
            text: "Desc.Tipo",
            editable: false
        },
        {
            dataField: "justificativa",
            text: "Justificatica",
            editable: false
        },
        {
            dataField: "observacao",
            text: "Observação",
            editable: false
        },
        {
            dataField: "codigoOperacao",
            text: "CódigoOp",
            editable: false
        },
        {
            dataField: "dataMedicaoShort",
            text: "DataMedição",
            editable: false
        },
    ]


    return (
        <div>
            <div className="cm-header">
                <div className="cm-header-inputs">
                    <div className="cm-box-label">
                        <label>Item</label>
                        <span>{customdata[0].codigoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Descrição</label>
                        <span>{customdata[0].descricaoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Plano Medição(Máquina)</label>
                        <span>{customdata[0].codigoCCAndDescricaoCC}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão</label>
                        <span>{customdata[0].verPlano}</span>
                    </div>
                </div>
            </div>

            <div className="cm-body">
                <CustomTable customcolumns={columns} customdata={customdata} />
                <div className="cm-body-box-button">
                    <button className="btn button-back" onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaMedicaoDetalhada;