import React, { useEffect, useState, useRef } from 'react';
import './style.css';

import CustomTable from '../../components/CustomTable';
import ReactLoading from 'react-loading';
import CustomPopup from '../../components/CustomPopup';

import { ApiConsultaMedicao } from '../../services/Jost/Api/ConsultaMedicao/Api';
import { SecurityConfig } from '../../services/SecurityConfig';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const CONSULTAMEDICAODET_PREFIX = "*ConsultaMedicaoDetalhada*";

    const refmodal = useRef(null);

    const [isErrorPopup, setIsErrorPopup] = useState(false);
    const [isOkPopup, setIsOkPopup] = useState(false);
    const [popupTitle, setPopupTitle] = useState();
    const [popupContent, setPopupContent] = useState();

    const [dic, setDic] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    useEffect(async () => {

        let dto = {
            codigoCC: customdata.codigoCC,
            descricaoItem: customdata.descricaoItem,
            codigoOperacao: customdata.codigoOperacao,
            dataInicio: customdata.dataRI,
            dataFim: customdata.dataRI
        };
        let resp = await ApiConsultaMedicao.getBy(dto);
        SecurityConfig.writeLogs(CONSULTAMEDICAODET_PREFIX, `Response from ApiConsultaMedicao.getBy(): ${resp?.sucess ? 'Ok' : "Error"}`);

        setDic(resp.data);

    }, [])

    const openModal = (title, content, isOk, isError) => {
        setPopupTitle(title);
        setPopupContent(content);
        setIsOkPopup(isOk);
        setIsErrorPopup(isError);
        refmodal.current.click();
    }

    const saveAll = async () => {

        try {
            setIsloading(true);
            await new Promise(r => setTimeout(r, 500));
            var compactedDic = [];

            Object.keys(dic).map((k, v) => {
                compactedDic.push({
                    idMedicaoCarac: dic[v].idMedicaoCarac,
                    valorMedido: dic[v].valorMedido
                })
            })

            let resp = await ApiConsultaMedicao.updateAll(compactedDic);
            SecurityConfig.writeLogs(CONSULTAMEDICAODET_PREFIX, `Response from ApiConsultaMedicao.updateAll(): ${resp?.sucess ? 'Ok' : "Error"}`);

            if (resp?.sucess) {
                openModal("Sucesso", "informações atualizadas com sucesso.", true, false);
            }

        }
        catch (e) {

        }
        finally {
            setIsloading(false);
        }
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
            text: "Pos",
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
            text: "N°Med",
            editable: false
        },
        {
            dataField: "valorMedido",
            text: "Valor",
            editable: true
        },
        {
            dataField: "descricaoTipo",
            text: "TipoMed",
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
            dataField: "numeroMatricula",
            text: "Nome",
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
            <div style={{ display: "none" }} ref={refmodal} data-toggle="modal" data-target="#messageModal"></div>
            <CustomPopup dataTargetID="messageModal" title={popupTitle} content={popupContent} isOk={isOkPopup} isError={isErrorPopup} />

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
                <CustomTable fieldKey="row" customcolumns={columns} customdata={dic} />
                <div className="cm-body-box-button">
                    <button className="btn button-save" disabled={isLoading} onClick={saveAll}>{isLoading ? <ReactLoading type="spin" width="20px" height="24px" color="#FFF" /> : "Salvar"}</button>
                    <button className="btn button-back" disabled={isLoading} onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaMedicaoDetalhada;