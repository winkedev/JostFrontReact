import React, { useEffect, useState, useRef } from 'react';
import './style.css';

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
            descricaoItem: customdata.descricaoItem,
            codigoOperacao: customdata.codigoOperacao,
            planoPadraoVersao: customdata.planoPadraoVersao,
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

    return (
        <div>

            <table id="xtable" style={{ display: "none" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Relatório de Itens Reprovados</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Centro Trabalho: {customdata.ct}</td>
                        <td>Material: {customdata.codigoItem}</td>
                        <td>Descricao: {customdata.descricaoItem}</td>
                    </tr>
                    <tr>
                        <td>Versão Material: {customdata.verPlano}</td>
                        <td>Versão Padrão: {customdata.planoPadraoVersao}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

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
                        <label>Versão</label>
                        <span>{customdata.verPlano}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão Padrão</label>
                        <span>{customdata.planoPadraoVersao}</span>
                    </div>
                </div>
            </div>

            <div className="cm-body">
                <CustomTable
                    tableid="idConsultaMedicaoTable"
                    fieldKey="row"
                    pdfHeaderText={
                        <p>
                            <h1>Relatório de itens reprovados</h1><br />
                            <span>Centro de Trabalho: {customdata.ct}</span><br />
                            <span>Material: {customdata.codigoItem}</span><br />
                            <span>Descrição: {customdata.descricaoItem}</span><br />
                            <span>Versão Material: {customdata.verPlano}</span><br />
                            <span>Versão Padrão: {customdata.planoPadraoVersao}</span><br />
                        </p>}
                    customcolumns={columns}
                    customdata={dic}
                    orientation='l'
                    isAlternateRowColor
                    validateNewValue={(currentRow, newValue) => {
                        if (currentRow.tipoCaracteristica.toUpperCase().includes("OK/NOK")) {
                            if (newValue.toUpperCase() == "OK" || newValue.toUpperCase() == "NOK") {
                                return true;
                            }
                            return false;
                        }

                        let limiteInferior = parseFloat((parseFloat(currentRow.caracteristica.toString().replace(",", ".")) + parseFloat(currentRow.limiteInferior.toString().replace(",", "."))).toFixed(4));
                        let limiteSuperior = parseFloat((parseFloat(currentRow.caracteristica.toString().replace(",", ".")) + parseFloat(currentRow.limiteSuperior.toString().replace(",", "."))).toFixed(4));
                        let newVal = parseFloat(newValue.toString().replace(",", "."));

                        if (newVal >= limiteInferior && newVal <= limiteSuperior) {
                            return true;
                        }

                        return false;
                    }}
                    onValidateErrorEvent={() => {
                        return swalMessagePopup("Erro ao validar campo", "Verifique os limites e o tipo de caracteristica.", 'error');
                    }} />
                <div className="cm-body-box-button">
                    <button className="btn button-back" disabled={isLoading} onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaItemReprovadoDetalhada;