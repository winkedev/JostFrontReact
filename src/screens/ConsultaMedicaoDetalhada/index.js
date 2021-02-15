import React from 'react';
import './style.css';

import CustomTable from '../../components/CustomTable';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const columns = [
        {
            dataField: "posicao",
            text: "Posição"
        },
        {
            dataField: "tipo",
            text: "Tipo"
        },
        {
            dataField: "caracteristica",
            text: "Característica"
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
            text: "N°Medição"
        },
        {
            dataField: "valorMedido",
            text: "ValorMedido"
        },
        {
            dataField: "descricaoTipo",
            text: "Desc.Tipo"
        },
        {
            dataField: "justificativa",
            text: "Justificatica"
        },
        {
            dataField: "observacao",
            text: "Observação"
        },
        {
            dataField: "codigoOperacao",
            text: "CódigoOp"
        },
        {
            dataField: "dataMedicaoShort",
            text: "DataMedição"
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