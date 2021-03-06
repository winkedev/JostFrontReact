import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import ReactLoading from 'react-loading';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

import ConsultaItemReprovadoDetalhada from '../ConsultaItemReprovadoDetalhada';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomTable from '../../components/CustomTable';
import { swalMessagePopup, swalConfirmPopup } from '../../components/SwalPopup';

import { ApiPlanoInspecao } from '../../services/Jost/Api/PlanoInspecao/Api';
import { ApiOrdemProducao } from '../../services/Jost/Api/OrdemProducao/Api';

import { SecurityConfig } from '../../services/SecurityConfig';

const ConsultaItemReprovado = () => {

    const CONSULTAIR_PREFIX = '*ConsultaItemReprovado*';

    const refCentroTrabalho = useRef(null);
    const refMaterial = useRef(null);
    const refOrdemProducao = useRef(null);
    const refVersaoPadrao = useRef(null);

    const [isConsumeLoading, setIsConsumeLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [dicMaquinas, setDicMaquinas] = useState([]);
    const [dicMaterial, setDicMaterial] = useState([]);
    const [dicOrdemProducao, setDicOrdemProducao] = useState([]);
    const [dicVersaoPadrao, setDicVersaoPadrao] = useState([]);

    const [currentCT, setCurrentCT] = useState(null);
    const [currentDescricaoItem, setCurrentDescricaoItem] = useState(null);
    const [currentCodigoOp, setCurrentCodigoOp] = useState(null);
    const [currentInitialDate, setCurrentInitialDate] = useState(new Date());
    const [currentFinalDate, setCurrentFinalDate] = useState(new Date());
    const [currentMedicao, setCurrentMedicao] = useState({});
    const [currentVersaoPP, setCurrentVersaoPP] = useState(null);

    const [medicaoData, setMedicaoData] = useState([]);
    const [isMedicaoDetalhada, setIsMedicaoDetalhada] = useState(false);
    const [initialDate, setInitialDate] = useState(new Date());
    const [finalDate, setFinalDate] = useState(new Date());

    useEffect(async () => {

        await fillMaquina();
        await fillItem();
        await fillOrdemProducao();
        await fillVersaoPadrao();
        setIsLoading(false);

    }, [])

    //#region Fill data

    const fillMaquina = async () => {

        let dicMaquinas = [];

        let resp = await ApiPlanoInspecao.getAllCodCC();
        SecurityConfig.writeLogs(CONSULTAIR_PREFIX, `Response from ApiPlanoInspecao.getAllCodCC(): ${resp?.data ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicMaquinas.push({
                label: resp.data[v].ct,
                value: resp.data[v].ct
            });
        });

        setDicMaquinas(dicMaquinas);

    }

    const fillItem = async () => {

        let dicMaterial = [];

        let resp = await ApiPlanoInspecao.getAllCodItem();
        SecurityConfig.writeLogs(CONSULTAIR_PREFIX, `Response from ApiPlanoInspecao.getAllCodItem(): ${resp?.sucess ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicMaterial.push({
                label: resp.data[v].codigoItem,
                value: resp.data[v].codigoItem
            })
        });

        setDicMaterial(dicMaterial);
    }

    const fillOrdemProducao = async () => {

        let dicOrdemProducao = [];

        let resp = await ApiOrdemProducao.getAll();
        SecurityConfig.writeLogs(CONSULTAIR_PREFIX, `Response from ApiOrdemProducao.getAll(): ${resp?.sucess ? 'Ok' : "Error"}`);

        Object.keys(resp.data).map((k, v) => {
            dicOrdemProducao.push({
                label: resp.data[v].codigoOp,
                value: resp.data[v].codigoOp
            });
        });

        setDicOrdemProducao(dicOrdemProducao);

    }

    const fillVersaoPadrao = async () => {

        let dicVersaoPadrao = [];

        let resp = await ApiPlanoInspecao.getAllVersaoPlanoPadrao();
        SecurityConfig.writeLogs(CONSULTAIR_PREFIX, `Response from ApiPlanoInspecao.getAllVersaoPlanoPadrao(): ${resp?.sucess ? 'Ok' : 'Error'}`);

        Object.keys(resp.data).map((k, v) => {
            dicVersaoPadrao.push({
                label: resp.data[v].planoPadraoVersao,
                value: resp.data[v].planoPadraoVersao
            })
        })

        setDicVersaoPadrao(dicVersaoPadrao);

    }

    //#endregion

    const searchData = async () => {

        try {

            if (currentDescricaoItem == null || currentDescricaoItem == '') {
                await swalMessagePopup("Aviso", "Campo 'Material' não pode estar vazio.", '');
                return;
            }

            setIsConsumeLoading(true);
            await new Promise(r => setTimeout(r, 500));

            let dto = {
                codigoCC: currentCT,
                descricaoItem: currentDescricaoItem,
                codigoOperacao: currentCodigoOp,
                planoPadraoVersao: currentVersaoPP,
                dataInicio: currentInitialDate != null ? currentInitialDate.toISOString() : null,
                dataFim: currentFinalDate != null ? currentFinalDate.toISOString() : null
            };

            let resp = await ApiPlanoInspecao.getBy(dto);
            SecurityConfig.writeLogs(CONSULTAIR_PREFIX, `Response from ApiPlanoInspecao.getBy(): ${resp?.sucess ? 'Ok' : "Error"}`);

            if (resp?.data != null) {
                setMedicaoData(resp.data);
            }
            else {
                setMedicaoData([]);
                await swalMessagePopup("Erro", "Erro ao recuperar plano de inspeção", "error");
            }
        } catch (e) {

        }
        finally {
            setIsConsumeLoading(false);
        }
    }

    const cleanData = () => {
        setCurrentCT(null);
        setCurrentDescricaoItem(null);
        setCurrentCodigoOp(null);
        setCurrentVersaoPP(null);

        refCentroTrabalho.current.select.clearValue();
        refMaterial.current.select.clearValue();
        refOrdemProducao.current.select.clearValue();
        refVersaoPadrao.current.select.clearValue();
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
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => mountMedicaoDetalhada(row)}>
                <i><FontAwesomeIcon icon={faFile} /></i>
            </button>)
    }

    const column = [
        {
            dataField: "ct",
            text: "Centro Trabalho",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            }
        },
        {
            dataField: "codigoItem",
            text: "Material",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            }
        },
        {
            dataField: "codigoOP",
            text: "Ordem Produção",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            }
        },
        {
            dataField: "descricaoItem",
            text: "Descrição",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "verPlano",
            text: "Versão Item",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '8.5%', textAlign: 'center' };
            }
        },
        {
            dataField: "planoPadraoVersao",
            text: "Versão Padrão",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '9%', textAlign: 'center' };
            }
        },
        {
            dataField: "dataMedicaoShort",
            text: "Data medição",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            }
        },
        {
            dataField: "IDConsultaDet",
            text: "Detalhes",
            formatter: actionformatter,
            editable: false,
            headerStyle: (colum, colIndex) => {
                return { width: '5%', textAlign: 'center' };
            }
        },
    ]

    return (
        <div className="ir-container">

            {isLoading ? <div className="ir-loading"><ReactLoading type="spin" width="128px" height="128px" color="#FFF" /></div> : <div>
                <div className="ir-title">
                    Consulta Itens Reprovados
            </div>

                {isMedicaoDetalhada ? <ConsultaItemReprovadoDetalhada customdata={currentMedicao} onBackButtonClick={() => unmountMedicaoDetalhada()} /> : <div>
                    <div className="ir-header">
                        <div className="ir-header-inputs">
                            <div className="ir-header-box-select">
                                <CustomSelectPicker title="Centro de Trabalho" REF={refCentroTrabalho} ID="IDMaquina" dict={dicMaquinas} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentCT(e?.value)} />
                            </div>

                            <div className="ir-header-box-select">
                                <CustomSelectPicker title="Material" ID="IDMaterial" REF={refMaterial} dict={dicMaterial} onChangeEvent={(e) => setCurrentDescricaoItem(e?.value)} />
                            </div>


                            <div className="ir-header-box-datepicker">
                                <CustomDatePicker title="Data Início" startdate={initialDate} value={currentInitialDate} onChangeEvent={(date) => setCurrentInitialDate(date != null ? date : null)} />
                            </div>

                            <div className="ir-header-box-datepicker">
                                <CustomDatePicker title="Data Final" startdate={finalDate} value={currentFinalDate} onChangeEvent={(date) => setCurrentFinalDate(date != null ? date : null)} />
                            </div>
                        </div>

                        <div className="ir-header-inputs" style={{ marginTop: "20px" }}>
                            <div className="ir-header-box-select">
                                <CustomSelectPicker title="Ordem produção" REF={refOrdemProducao} ID="IDOrdemProducao" dict={dicOrdemProducao} onChangeEvent={(e) => setCurrentCodigoOp(e?.value)} />
                            </div>
                            <div className="ir-header-box-select">
                                <CustomSelectPicker title="Versão Padrão" REF={refVersaoPadrao} ID="IDVersaoPadrao" dict={dicVersaoPadrao} onChangeEvent={(e) => setCurrentVersaoPP(e?.value)} />
                            </div>
                        </div>


                        <div style={{ borderBottom: "1px solid #EBECF1", marginTop: "20px" }}>
                        </div>

                        <div className="ir-header-box-buttons">
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

                    <div className="ir-body">
                        <CustomTable customcolumns={column} customdata={medicaoData} disableExport />
                    </div>
                </div>}
            </div>}
        </div>
    );
}

export default ConsultaItemReprovado;