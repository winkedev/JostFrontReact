import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { logo } from '../../assets/base64.json';

import CustomTable from '../../components/CustomTable';

import { ApiConsultaMedicao } from '../../services/Jost/Api/ConsultaMedicao/Api';
import { SecurityConfig } from '../../services/SecurityConfig';

import { swalMessagePopup } from '../../components/SwalPopup';

const ConsultaItemReprovadoDetalhada = ({ customdata, onBackButtonClick }) => {

    const CONSULTAMEDICAODET_PREFIX = "*ConsultaIitemReprovadoDetalhada*";

    const [dic, setDic] = useState([]);

    const [isLoading, setIsloading] = useState(false);

    useEffect(async () => {

        let dto = {
            ct: customdata.ct,
            codigoItem: customdata.codigoItem,
            codigoOperacao: customdata.codigoOP,
            planoPadraoVersao: customdata.planoPadraoVersao,
            planoPadrao: customdata.planoPadrao,
            dataInicio: customdata.dataRI,
            dataFim: customdata.dataRI
        };
        let resp = await ApiConsultaMedicao.getItemReprovadoBy(dto);
        SecurityConfig.writeLogs(CONSULTAMEDICAODET_PREFIX, `Response from ApiConsultaMedicao.getItemReprovadoBy(): ${resp?.sucess ? 'Ok' : "Error"}`);

        setDic(resp?.data ?? []);

    }, [])


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
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '5%', textAlign: 'center' };
            }
        },
        {
            dataField: "tipo",
            text: "Tipo",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "caracteristica",
            text: "Carac.",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "class",
            text: "Class",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '5%', minWidth: '5%', textAlign: 'center' };
            }
        },
        {
            dataField: "limite",
            text: "Limites",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "valorMedido",
            text: "Valor",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '5%', textAlign: 'center' };
            }
        },
        {
            dataField: "descricaoTipo",
            text: "TipoMed",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "justificativa",
            text: "Justificativa",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7%', textAlign: 'center' };
            }
        },
        {
            dataField: "relN",
            text: "RelN",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "dsv",
            text: "DSV",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "numeroMatricula",
            text: "Nome",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '5%', textAlign: 'center' };
            }
        },
        {
            dataField: "dataMedicaoShort",
            text: "Data Med.",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '10%', textAlign: 'center' };
            }
        }
    ]

    const mountPDFHeader = () => {
        return <table id="xtable" className="xtable" style={{ display: "none" }}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowSpan="4"><img src={`data:image/jpg;base64,${logo}`} width="111px" height="50px" /></td>
                    <td rowSpan="2" colSpan="2">Relatório de Itens Reprovados</td>
                    <td>Versão</td>
                    <td>{customdata.verPlano}</td>
                </tr>
                <tr>
                    <td colSpan="3">Centro de Trabalho</td>
                </tr>
                <tr>
                    <td>Material</td>
                    <td>{customdata.codigoItem}</td>
                    <td rowSpan="2" colSpan="3">{customdata.ct}</td>
                </tr>
                <tr>
                    <td>Descricao</td>
                    <td>{customdata.descricaoItem}</td>
                </tr>
            </tbody>
        </table>
    }

    return (
        <div>

            {mountPDFHeader()}

            <div className="cm-header">
                <div className="cm-header-inputs">
                    <div className="cm-box-label">
                        <label>Material</label>
                        <span>{customdata.codigoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Descrição</label>
                        <span>{customdata.descricaoItem}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Centro Trabalho</label>
                        <span>{customdata.ct}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão Item</label>
                        <span>{customdata.verPlano}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão Padrão</label>
                        <span>{customdata.planoPadraoVersao == '' ? 'N/A.' : customdata.planoPadraoVersao}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Plano Padrão</label>
                        <span>{customdata.planoPadrao}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Ordem Produção</label>
                        <span>{customdata.codigoOP}</span>
                    </div>
                </div>
            </div>

            <div className="cm-body">
                <CustomTable
                    tableid="idConsultaMedicaoTable"
                    fieldKey="row"
                    exportFileName="RelatorioIR"
                    pdfTableHeaderID="xtable"
                    excelHeaders={[
                        ["Relatório de itens reprovados"],
                        [`Material: ${customdata.codigoItem}`],
                        [`Descrição: ${customdata.descricaoItem}`],
                        [`Versão: ${customdata.verPlano}`],
                        [`Versão Padrão: ${customdata.planoPadraoVersao}`],
                        []
                    ]}
                    customcolumns={columns}
                    customdata={dic}
                    orientation='l'
                    isAlternateRowColor />
                <div className="cm-body-box-button">
                    <button className="btn button-back" disabled={isLoading} onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaItemReprovadoDetalhada;