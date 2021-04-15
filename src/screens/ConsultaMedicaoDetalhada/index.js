import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { logo } from '../../assets/base64.json';

import CustomTable from '../../components/CustomTable';

import { ApiConsultaMedicao } from '../../services/Jost/Api/ConsultaMedicao/Api';
import { SecurityConfig } from '../../services/SecurityConfig';
import { swalMessagePopup } from '../../components/SwalPopup';

const ConsultaMedicaoDetalhada = ({ customdata, onBackButtonClick }) => {

    const CONSULTAMEDICAODET_PREFIX = "*ConsultaMedicaoDetalhada*";

    const [dic, setDic] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [isShowColumns, setIsShowColumns] = useState(false);

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
        let resp = await ApiConsultaMedicao.getBy(dto);
        SecurityConfig.writeLogs(CONSULTAMEDICAODET_PREFIX, `Response from ApiConsultaMedicao.getBy(): ${resp?.sucess ? 'Ok' : "Error"}`);

        setDic(resp?.data ?? []);

    }, [])

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
                swalMessagePopup("Sucesso", "informações atualizadas com sucesso.", "success");
            }

        }
        catch (e) {

        }
        finally {
            setIsloading(false);
        }
    }

    const actionformatter = (cell, row) => {
        return (
            <div>
                { row?.justificativa != '' ?
                    <button className="btn bg-primary-blue" style={{ width: "25px", height: "25px" }} onClick={() => setIsShowColumns(!isShowColumns)} />
                    : ""
                }
            </div>
        )
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
            hidden: !isShowColumns,
            headerStyle: (colum, colIndex) => {
                return { width: '7%', textAlign: 'center' };
            }
        },
        {
            dataField: "relN",
            text: "RelN",
            editable: false,
            sort: true,
            hidden: !isShowColumns,
            headerStyle: (colum, colIndex) => {
                return { width: '7.7%', textAlign: 'center' };
            }
        },
        {
            dataField: "dsv",
            text: "DSV",
            editable: false,
            sort: true,
            hidden: !isShowColumns,
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
        },
        {
            dataField: "showHiddens",
            text: "Mot.",
            editable: false,
            sort: true,
            headerStyle: (colum, colIndex) => {
                return { width: '4%', textAlign: 'center' };
            },
            formatter: actionformatter
        },
    ]

    const mountPDFHeader = () => {
        return <table id="xtable" style={{ display: "none", backgroundColor: "#FFFFFF" }}>
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
                    <td rowSpan="4"><img src={`data:image/jpg;base64,${logo}`} width="150px" height="40px" /></td>
                    <td rowSpan="2" colSpan="2" style={{ fontSize: 27, textAlign: "center" }}>Relatório de Medições</td>
                    <td style={{ textAlign: "left", paddingLeft: 2 }}>Versão:</td>
                    <td style={{ textAlign: "left", paddingLeft: 2 }}>{customdata.verPlano}</td>
                </tr>
                <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>Centro de Trabalho</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "right", paddingRight: 2 }}>Material:</td>
                    <td style={{ textAlign: "left", paddingLeft: 2 }}>{customdata.codigoItem}</td>
                    <td rowSpan="2" colSpan="3" style={{ textAlign: "center" }}>{customdata.ct}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "right", paddingRight: 2 }}>Descricao:</td>
                    <td style={{ textAlign: "left", paddingLeft: 2 }}>{customdata.descricaoItem}</td>
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
                        <label>Plano Padrão</label>
                        <span>{customdata.planoPadrao == '' ? 'N/A.' : customdata.planoPadrao}</span>
                    </div>
                    <div className="cm-box-label">
                        <label>Versão Padrão</label>
                        <span>{customdata.planoPadraoVersao == '' ? 'N/A.' : customdata.planoPadraoVersao}</span>
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
                    exportFileName="RelatorioMed"
                    pdfTableHeaderID="xtable"
                    excelHeaders={[
                        ["Relatório de Medições"],
                        [`Material: ${customdata.codigoItem}`],
                        [`Descrição: ${customdata.descricaoItem}`],
                        [`Versão: ${customdata.verPlano}`],
                        [`Versão Padrão: ${customdata.planoPadraoVersao}`],
                        []
                    ]}
                    customcolumns={columns}
                    customdata={dic}
                    orientation='l' />
                <div className="cm-body-box-button">
                    <button className="btn button-back" disabled={isLoading} onClick={onBackButtonClick}>Voltar</button>
                </div>
            </div>

        </div>
    )
}

export default ConsultaMedicaoDetalhada;