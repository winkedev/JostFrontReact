import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import Swal from 'sweetalert2';

import ReactLoading from 'react-loading';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomPopup from '../../components/CustomPopup';

import CadastraMedicaoDetalhada from '../CadastraMedicaoDetalhada';

import { ApiPlanoInspecao } from '../../services/Jost/Api/PlanoInspecao/Api';
import { ApiOrdemProducao } from '../../services/Jost/Api/OrdemProducao/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import { SecurityConfig } from '../../services/SecurityConfig';

const CadastraMedicao = () => {

    const CONSULTAMEDICAO_PREFIX = '*CadastraMedicao*';

    const refmodal = useRef(null);

    const [modalTitle, setModalTitle] = useState();
    const [modalContent, setmodalContent] = useState();
    const [isModalWarning, setIsModalWarning] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isConsumeLoading, setIsConsumeLoading] = useState(false);

    const [dicMaquinas, setDicMaquinas] = useState([])
    const [dicMaterial, setDicMaterial] = useState([])
    const [dicOrdemProducao, setDicOrdemProducao] = useState([]);
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());
    const [medicaoData, setMedicaoData] = useState([]);
    const [isMedicaoDetalhada, setIsMedicaoDetalhada] = useState(false);

    const [currentCodigoCC, setCurrentCodigoCC] = useState(null);
    const [currentDescricaoItem, setCurrentDescricaoItem] = useState(null);
    const [currentCodigoOp, setCurrentCodigoOp] = useState(null);
    const [currentInitialDate, setCurrentInitialDate] = useState(new Date());
    const [currentFinalDate, setCurrentFinalDate] = useState(new Date());
    const [currentMedicao, setCurrentMedicao] = useState({});

    useEffect(async () => {

        await fillMaquina();
        await fillItem();
        await fillOrdemProducao();
        setIsLoading(false);

    }, [])

    const openModal = (title, message, isWarning) => {
        setModalTitle(title);
        setmodalContent(message);
        setIsModalWarning(isWarning);
        refmodal.current.click();
    }

    //#region Fill data

    const fillMaquina = async () => {

        let dicMaquinas = [];

        let resp = await ApiPlanoInspecao.getAllCodCC();
        SecurityConfig.writeLogs(CONSULTAMEDICAO_PREFIX, `Response from ApiPlanoInspecao.getAllCodCC(): ${resp?.data ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicMaquinas.push({
                key: resp.data[v].codigoCC,
                value: resp.data[v].codigoCC + " " + resp.data[v].descricaoCC
            });
        });

        setDicMaquinas(dicMaquinas);

    }

    const fillItem = async () => {

        let dicMaterial = [];

        let resp = await ApiPlanoInspecao.getAllCodItem();
        SecurityConfig.writeLogs(CONSULTAMEDICAO_PREFIX, `Response from ApiPlanoInspecao.getAllCodItem(): ${resp?.sucess ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicMaterial.push({
                key: resp.data[v].codigoItem,
                value: resp.data[v].codigoItem
            })
        });

        setDicMaterial(dicMaterial);
    }

    const fillOrdemProducao = async () => {

        let dicOrdemProducao = [];

        let resp = await ApiOrdemProducao.getAll();
        SecurityConfig.writeLogs(CONSULTAMEDICAO_PREFIX, `Response from ApiOrdemProducao.getAll(): ${resp?.sucess ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicOrdemProducao.push({
                key: resp.data[v].codigoOp,
                value: resp.data[v].codigoOp
            });
        });

        setDicOrdemProducao(dicOrdemProducao);

    }

    //#endregion

    const searchData = async () => {

        try {
            if (currentDescricaoItem == null || currentDescricaoItem == '') {
                openModal("Aviso", "Item deve ser preenchido para concluir a busca.", true);
                return;
            }

            setIsConsumeLoading(true);
            await new Promise(r => setTimeout(r, 500));

            let dto = {
                codigoCC: currentCodigoCC,
                descricaoItem: currentDescricaoItem,
                codigoOperacao: currentCodigoOp,
                dataInicio: currentInitialDate != null ? currentInitialDate.toISOString() : null,
                dataFim: currentFinalDate != null ? currentFinalDate.toISOString() : null
            };

            let resp = await ApiPlanoInspecao.getBy(dto);
            SecurityConfig.writeLogs(CONSULTAMEDICAO_PREFIX, `Response from ApiPlanoInspecao.getBy(): ${resp?.sucess ? 'Ok' : "Error"}`);

            if (resp?.data != null) {
                setMedicaoData(resp.data);
            }
            else {
                setMedicaoData([]);
                openModal("Aviso", "Não existe nenhuma informação.", true)
            }
        } catch (e) {

        }
        finally {
            setIsConsumeLoading(false);
        }

    }

    const cleanData = () => {
        setCurrentCodigoCC(null);
        setCurrentDescricaoItem(null);
        setCurrentCodigoOp(null);

        document.getElementById("IDMaquina").value = "selectone";
        document.getElementById("IDMaterial").value = "selectone";
        document.getElementById("IDOrdemProducao").value = "selectone";
    }

    const mountMedicaoDetalhada = (row) => {
        setIsMedicaoDetalhada(true);
        setCurrentMedicao(row);
    }

    const unmountMedicaoDetalhada = () => {
        setIsMedicaoDetalhada(false);
        setCurrentMedicao(null);
    }


    const actionformatter = (cell, row) => {
        return (
            <button className="btn btn-primary" style={{ width: "30%" }} onClick={() => mountMedicaoDetalhada(row)}>
                <i><FontAwesomeIcon icon={faFile} /></i>
            </button>)
    }

    const column = [
        {
            dataField: "codigoCCAndDescricaoCC",
            text: "Centro de Trabalho",
            editable: false,
            sort: true
        },
        {
            dataField: "codigoItem",
            text: "Item",
            editable: false,
            sort: true
        },
        {
            dataField: "codigoOP",
            text: "Código Operação",
            editable: false,
            sort: true
        },
        {
            dataField: "descricaoItem",
            text: "Descrição",
            editable: false,
            sort: true
        },
        {
            dataField: "verPlano",
            text: "Versão Plano",
            editable: false,
            sort: true
        },
        {
            dataField: "dataMedicaoShort",
            text: "Data medição",
            editable: false,
            sort: true
        },
        {
            dataField: "IDConsultaDet",
            text: "Consulta Medições",
            formatter: actionformatter,
            editable: false
        },
    ]

    return (
        <div className="consulta-medicao-container">
            {isLoading ? <div className="cm-loading"><ReactLoading type="spin" width="128px" height="128px" color="#FFF" /> </div> :

                <div>

                    <div className="cm-title">
                        <h4>Cadastro Medição</h4>
                    </div>


                    {isMedicaoDetalhada ? <CadastraMedicaoDetalhada customdata={currentMedicao} onBackButtonClick={() => unmountMedicaoDetalhada()} /> :
                        <div>
                            <div style={{ display: "none" }} ref={refmodal} data-toggle="modal" data-target="#messageModal"></div>
                            <CustomPopup dataTargetID="messageModal" title={modalTitle} content={modalContent} isWarning={isModalWarning} />
                            <div className="cm-header">
                                <div className="cm-header-inputs">
                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Centro de Trabalho" ID="IDMaquina" dict={dicMaquinas} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentCodigoCC(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Item" ID="IDMaterial" dict={dicMaterial} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentDescricaoItem(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Ordem produção" ID="IDOrdemProducao" dict={dicOrdemProducao} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentCodigoOp(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-datepicker">
                                        <CustomDatePicker title="Data Início" startdate={initialDate} value={currentInitialDate} onChangeEvent={(date) => setCurrentInitialDate(date != null ? date : null)} />
                                    </div>

                                    <div className="cm-header-box-datepicker">
                                        <CustomDatePicker title="Data Final" startdate={finalDate} value={currentFinalDate} onChangeEvent={(date) => setCurrentFinalDate(date != null ? date : null)} />
                                    </div>
                                </div>

                                <div className="cm-header-box-buttons">
                                    <button className="btn button-ok" disabled={isConsumeLoading} onClick={searchData}>
                                        {isConsumeLoading ?
                                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <ReactLoading type="spin" width="22px" height="22px" color="#FFFFFF" />
                                            </div>
                                            :
                                            "Consultar"
                                        }
                                    </button>
                                    <button className="btn button-limpar" disabled={isConsumeLoading} onClick={cleanData}>Limpar</button>
                                </div>
                            </div>

                            <div className="cm-body" style={{ height: "100%" }}>
                                <CustomTable customcolumns={column} customdata={medicaoData} />
                            </div>
                        </div>
                    }

                </div>
            }
        </div>)
}

export default CadastraMedicao;