import React, { useState, useEffect } from 'react';
import './style.css';

import ReactLoading from 'react-loading';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';
import CustomDatePicker from '../../components/CustomDatePicker';

import ConsultaMedicaoDetalhada from '../ConsultaMedicaoDetalhada';

import { ApiConsultaMedicao } from '../../services/Jost/Api/ConsultaMedicao/Api';
import { ApiPlanoInspecao } from '../../services/Jost/Api/PlanoInspecao/Api';
import { ApiOrdemProducao } from '../../services/Jost/Api/OrdemProducao/Api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

const ConsultaMedicao = () => {

    const [isLoading, setIsLoading] = useState(true);

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
    const [currentMedicao, setCurrentMedicao] = useState([]);

    useEffect(async () => {

        await fillMaquinaAndMaterial();
        await fillOrdemProducao();

        setIsLoading(false);

    }, [])

    const fillMaquinaAndMaterial = async () => {

        let dicMaquinas = [];
        let dicMaterial = [];

        let resp = await ApiPlanoInspecao.getAll();

        Object.keys(resp.data).map((k, v) => {
            dicMaquinas.push({
                key: resp.data[v].codigoCC,
                value: resp.data[v].codigoCC + " " + resp.data[v].descricaoCC
            });

            dicMaterial.push({
                key: resp.data[v].codigoItem,
                value: resp.data[v].codigoItem
            })
        })

        setDicMaquinas(dicMaquinas);
        setDicMaterial(dicMaterial);
    }

    const fillOrdemProducao = async () => {

        let dicOrdemProducao = [];

        let resp = await ApiOrdemProducao.getAll();

        Object.keys(resp.data).map((k, v) => {
            dicOrdemProducao.push({
                key: resp.data[v].codigoOp,
                value: resp.data[v].codigoOp
            });
        });

        setDicOrdemProducao(dicOrdemProducao);

    }

    const searchData = async () => {

        let dto = {
            codigoCC: currentCodigoCC,
            descricaoItem: currentDescricaoItem,
            codigoOperacao: currentCodigoOp,
            dataInicio: currentInitialDate != null ? currentInitialDate.toISOString() : null,
            dataFim: currentFinalDate != null ? currentFinalDate.toISOString() : null
        };

        let resp = await ApiConsultaMedicao.getBy(dto);

        setMedicaoData(resp != null && resp.data != null ? resp.data : []);
    }

    const mountMedicaoDetalhada = (row) => {
        let dic = [];
        dic.push(row)
        setIsMedicaoDetalhada(true);
        setCurrentMedicao(dic);
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
            text: "Maquina"
        },
        {
            dataField: "codigoItem",
            text: "Item"
        },
        {
            dataField: "descricaoItem",
            text: "Descricao"
        },
        {
            dataField: "verPlano",
            text: "VersaoPlano"
        },
        {
            dataField: "IDConsultaDet",
            text: "Consulta Det",
            formatter: actionformatter
        },
    ]

    return (
        <div className="consulta-medicao-container">

            {isLoading ? <div className="cm-loading"><ReactLoading type="spin" width="128px" height="128px" color="#FFF" /> </div> :

                <div>

                    <div className="cm-title">
                        <h4>Consulta Medicao</h4>
                    </div>



                    {isMedicaoDetalhada ? <ConsultaMedicaoDetalhada customdata={currentMedicao} onBackButtonClick={() => unmountMedicaoDetalhada()} /> :
                        <div>
                            <div className="cm-header">
                                <div className="cm-header-inputs">
                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Maquina" dict={dicMaquinas} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentCodigoCC(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Item" dict={dicMaterial} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentDescricaoItem(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-select">
                                        <CustomSelectPicker title="Operacao" dict={dicOrdemProducao} initWithEmptyValue={true} onChangeEvent={(e) => setCurrentCodigoOp(e.target.value)} />
                                    </div>

                                    <div className="cm-header-box-datepicker">
                                        <CustomDatePicker title="Data Inicio" startdate={initialDate} value={currentInitialDate} onChangeEvent={(date) => setCurrentInitialDate(date != null ? date : null)} />
                                    </div>

                                    <div className="cm-header-box-datepicker">
                                        <CustomDatePicker title="Data Final" startdate={finalDate} value={currentFinalDate} onChangeEvent={(date) => setCurrentFinalDate(date != null ? date : null)} />
                                    </div>
                                </div>

                                <div className="cm-header-box-buttons">
                                    <button className="btn button-ok" onClick={searchData}>Consultar</button>
                                    <button className="btn button-limpar">Limpar</button>
                                </div>
                            </div>

                            <div className="cm-body">
                                <CustomTable customcolumns={column} customdata={medicaoData} />
                            </div>
                        </div>
                    }

                </div>
            }
        </div>)
}

export default ConsultaMedicao;