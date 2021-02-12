import React from 'react';
import './style.css';

import CustomTable from '../../components/CustomTable';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const columns = [
        {
            dataField: "posicao",
            text: "Posicao"
        },
        {
            dataField: "tipo",
            text: "Tipo"
        },
        {
            dataField: "caracteristica",
            text: "Caracteristica"
        },
        {
            dataField: "class",
            text: "Class"
        },
        {
            dataField: "limite",
            text: "Limites"
        },
        {
            dataField: "numeroMedicao",
            text: "NMedicao"
        },
        {
            dataField: "valorMedido",
            text: "ValorMedido"
        },
        {
            dataField: "descricaoTipo",
            text: "DescTipo"
        },
        {
            dataField: "justificativa",
            text: "Justificatica"
        },
        {
            dataField: "observacao",
            text: "Observacao"
        },
        {
            dataField: "codigoOperacao",
            text: "CodigoOp"
        },
        {
            dataField: "dataMedicao",
            text: "DataMedicao"
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
                        <label>Descricao</label>
                        <span>{customdata[0].descricaoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Plano Medicao</label>
                        <span>{customdata[0].codigoCCAndDescricaoCC}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versao</label>
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