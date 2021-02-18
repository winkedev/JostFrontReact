import React, { useEffect, useState } from 'react';
import './style.css';

import CustomTable from '../../components/CustomTable';
import ReactLoading from 'react-loading';

import { ApiConsultaMedicao } from '../../services/Jost/Api/ConsultaMedicao/Api';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const [dic, setDic] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    useEffect(async () => {

        console.log("actived");

        let dto = {
            codigoCC: customdata.codigoCC,
            descricaoItem: customdata.descricaoItem,
            codigoOperacao: customdata.codigoOperacao,
            dataInicio: customdata.dataRI,
            dataFim: customdata.dataRI
        };
        let resp = await ApiConsultaMedicao.getBy(dto);

        setDic(resp.data);

    }, [])

    const saveAll = async () => {

        setIsloading(true);
        await new Promise(r => setTimeout(r, 1000));
        var compactedDic = [];

        Object.keys(dic).map((k, v) => {
            compactedDic.push({
                idMedicaoCarac: dic[v].idMedicaoCarac,
                valorMedido: dic[v].valorMedido
            })
        })

        let resp = await ApiConsultaMedicao.updateAll(compactedDic);

        setIsloading(false);
    }

    const columns = [
        {
            dataField: "row",
            text: "Row",
            editable: false,
            hidden: true
        },
        {
            dataField: "posicao",
            text: "Posição",
            editable: false,

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
            editable: true
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
                        <span>{customdata.codigoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Descrição</label>
                        <span>{customdata.descricaoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Plano Medição(Máquina)</label>
                        <span>{customdata.codigoCCAndDescricaoCC}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão</label>
                        <span>{customdata.verPlano}</span>
                    </div>
                </div>
            </div>

            <div className="cm-body">
                <CustomTable isAlternateRowColor="true" fieldKey="row" customcolumns={columns} customdata={dic} />
                <div className="cm-body-box-button">
                    <button className="btn button-save" disabled={isLoading} onClick={saveAll}>{isLoading ? <ReactLoading type="spin" width="20px" height="24px" color="#FFF" /> : "Salvar"}</button>
                    <button className="btn button-back" disabled={isLoading} onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaMedicaoDetalhada;