import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import { swalMessagePopup, swalConfirmPopup } from '../../components/SwalPopup';
import { clone } from '../../utils/CloneObject';

import { ApiMotivo } from '../../services/Jost/Api/Motivo/Api';

import ReactLoading from 'react-loading';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';

import { ReactComponent as DeleteSVG } from '../../assets/delete.svg';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';
import { ReactComponent as PlusSVG } from '../../assets/plus.svg';

const CadastroMotivo = () => {

    const [isLoading, setIsloading] = useState(true);
    const [isEditLoading, setIsEditLoading] = useState(false);

    const [fullMotivos, setFullMotivos] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [currentSelectMotivo, setCurrentSelectMotivo] = useState(null);
    const [currentSelectedRow, setCurrentSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(async () => {

        await consumeMotivos();

        setIsloading(false);

    }, [])

    const consumeMotivos = async () => {
        let resp = await ApiMotivo.getAll();

        if (resp?.data?.length > 0) {
            setFullMotivos(resp.data);
            fillSelect(resp.data);
        }
    }

    const consumeMotivosAndFulltable = async () => {
        let resp = await ApiMotivo.getAll();

        console.log(resp);

        if (resp?.data?.length > 0) {
            setFullMotivos(resp.data);
            fillSelect(resp.data);
            fillDataAfterRefresh(document.getElementById("idNaoConformeSelect").value, resp.data);
        }
    }

    const fillSelect = (data) => {
        var respdata = [];

        if (data?.length > 0) {
            Object.keys(data).map((k, v) => {
                respdata.push({
                    label: data[v].descricao,
                    value: data[v].id,
                })
            })

            setSelectData(respdata);
        }
    }

    const fillData = (e) => {

        console.log(e);
        let tableData = [];
        setTableData([]);

        Object.keys(fullMotivos).map((k, v) => {
            if (fullMotivos[v].id == e) {
                setCurrentSelectMotivo(fullMotivos[v]);
                let currentMotivo = fullMotivos[v];
                let currentMotivoN2 = fullMotivos[v].motivoN2;
                if (currentMotivoN2?.length > 0) {
                    Object.keys(currentMotivoN2).map((k, v) => {
                        tableData.push({
                            idN1: currentMotivo.id,
                            idN2: currentMotivoN2[v].id,
                            descricaoN1: currentMotivo.descricao,
                            descricaoN2: currentMotivoN2[v].descricao
                        });
                    });
                }
                else {
                    tableData.push({
                        idN1: currentMotivo.id,
                        idN2: -1,
                        descricaoN1: currentMotivo.descricao,
                        descricaoN2: ''
                    });
                }
            }
        })

        setTableData(tableData);
    }

    const fillDataAfterRefresh = (e, refreshData) => {

        console.log(refreshData);
        let tableData = [];
        setTableData([]);

        Object.keys(refreshData).map((k, v) => {
            if (refreshData[v].id == e) {
                setCurrentSelectMotivo(refreshData[v]);
                let currentMotivo = refreshData[v];
                let currentMotivoN2 = refreshData[v].motivoN2;
                if (currentMotivoN2?.length > 0) {
                    Object.keys(currentMotivoN2).map((k, v) => {
                        tableData.push({
                            idN1: currentMotivo.id,
                            idN2: currentMotivoN2[v].id,
                            descricaoN1: currentMotivo.descricao,
                            descricaoN2: currentMotivoN2[v].descricao
                        });
                    });
                }
                else {
                    tableData.push({
                        idN1: currentMotivo.id,
                        idN2: -1,
                        descricaoN1: currentMotivo.descricao,
                        descricaoN2: ''
                    });
                }
            }
        })

        setTableData(tableData);
    }


    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="btn" disabled={row.idN2 == -1} onClick={() => editCausa(row)} style={{ width: "64px" }} >
                    <EditSVG fill="#01579B" width={20} height={20} />
                </button>
                <button className="btn" disabled={row.idN2 == -1} onClick={() => deleteCausa(row)} style={{ width: "64px" }}>
                    <DeleteSVG fill="red" width={20} height={20} />
                </button>
            </div>
        )
    }

    const mountEditInputs = (row) => {
        return "<div class='cadastro-motivo-edit-inputs-container'>" +
            "<div class='cadastro-motivo-edit-inputs'>" +
            "<div class='input-group-prepend'>" +
            "<span class='input-group-text' id='basic-addon1'>Causa: </span>" +
            "</div>" +
            "<input id='id-input-descricao' type='text' class='form-control' placeholder='Descrição...' value='" + row.descricaoN2 + "' aria-label='Username' aria-describedby='basic-addon1' />" +
            "</div>" +
            "</div>"
    }

    const mountCadastroNaoConforme = () => {
        return "<div class='cadastro-motivo-edit-inputs-container'>" +
            "<div class='cadastro-motivo-edit-inputs'>" +
            "<div class='input-group-prepend'>" +
            "<span class='input-group-text' id='basic-addon1'>Não conforme: </span>" +
            "</div>" +
            "<input id='id-input-descricao' type='text' class='form-control' placeholder='Descrição...' aria-label='Username' aria-describedby='basic-addon1' />" +
            "</div>" +
            "</div>"
    }

    const mountCadastroCausa = () => {
        return "<div class='cadastro-motivo-edit-inputs-container'>" +
            "<i>Não conforme: <strong>" + currentSelectMotivo.descricao + "</strong></i>" +
            "<div class='cadastro-motivo-edit-inputs'>" +
            "<div class='input-group-prepend'>" +
            "<span class='input-group-text' id='basic-addon1'>Causa: </span>" +
            "</div>" +
            "<input id='id-input-descricao' type='text' class='form-control' placeholder='Descrição...' aria-label='Username' aria-describedby='basic-addon1' />" +
            "</div>" +
            "</div>"
    }

    const editCausa = async (row) => {

        let resp = await swalConfirmPopup(
            'Editar',
            '',
            'warning',
            'Confirmar',
            null,
            'Cancelar',
            false,
            mountEditInputs(row),
            true,
            () => {

                var motivo;

                Object.keys(fullMotivos).map((k, v) => {
                    if (fullMotivos[v].id == row.idN1) {
                        motivo = fullMotivos[v];
                        let motivoN2 = motivo?.motivoN2;
                        Object.keys(motivoN2).map((k, v) => {
                            if (motivoN2[v].id == row.idN2) {
                                motivoN2[v].descricao = document.getElementById("id-input-descricao").value;
                            }
                        })
                    }
                });

                return ApiMotivo.saveUpdate(motivo);
            }
        );

        if (resp.isConfirmed) {
            await consumeMotivosAndFulltable();
        }

    }


    const deleteCausa = async (row) => {

        let resp = await swalConfirmPopup(
            'Excluir',
            `Deseja excluir ${row.descricaoN2} permanentemente?`,
            'warning',
            "Confirmar",
            null,
            null,
            false,
            null,
            true,
            () => {
                return ApiMotivo.deleteN2({ id: row.idN2 });
            }
        )

        if (resp.isConfirmed) {
            await consumeMotivosAndFulltable();
        }
    }

    const cadastrarNaoConforme = async () => {
        let resp = await swalConfirmPopup(
            'Cadastro Não Conforme',
            '',
            '',
            'Cadastrar',
            null,
            'Cancelar',
            false,
            mountCadastroNaoConforme(),
            true,
            () => {
                var value = document.getElementById("id-input-descricao").value;

                if (value != null && value != '') {
                    return ApiMotivo.saveUpdate({ descricao: value, dataRI: new Date().toISOString() })
                        .then(res => {
                            if (res?.sucess) {
                                return true;
                            }
                            else {
                                return swalMessagePopup("Erro", 'Erro ao cadastrar não conforme.', 'error');
                            }
                        });
                }
            }
        );

        if (resp.isConfirmed) {
            await swalMessagePopup("Sucesso", 'Não conforme cadastrado com sucesso.', 'success');
            await consumeMotivosAndFulltable();
        }
    }

    const cadastrarCausa = async () => {
        let resp = await swalConfirmPopup(
            'Cadastro Causa',
            '',
            '',
            'Cadastrar',
            null,
            'Cancelar',
            false,
            mountCadastroCausa(),
            true,
            () => {
                let value = document.getElementById("id-input-descricao").value;

                if (value != null && value != '') {


                    var currentMotivo;
                    Object.keys(fullMotivos).map((k, v) => {
                        if (fullMotivos[v].id == currentSelectMotivo.id) {
                            currentMotivo = clone(fullMotivos[v]);
                            currentMotivo.motivoN2.push({
                                descricao: value
                            });
                        }
                    });

                    return ApiMotivo.saveUpdate(currentMotivo)
                        .then(res => {
                            if (res?.sucess) {
                                return true;
                            }
                            else {
                                swalMessagePopup("Erro", `Erro ao atualizar motivo: ${res?.message}`, "error");
                                return false;
                            }
                        });
                }
            }
        );

        if (resp.isConfirmed) {
            await consumeMotivosAndFulltable();
        }
    }

    var columnsNaoConforme = [
        {
            dataField: "idN1",
            text: "IDN1",
            editable: false,
            hidden: true
        },
        {
            dataField: "descricaoN1",
            text: "Descrição Não Conforme",
            editable: false
        },
        {
            dataField: "acoes",
            text: "Ação",
            editable: false,
            formatter: actionFormatter
        },
    ]

    var columnsCausa = [
        {
            dataField: "idN2",
            text: "IDN2",
            editable: false,
            hidden: true
        },
        {
            dataField: "descricaoN2",
            text: "Descrição Causa",
            editable: false
        },
        {
            dataField: "acoes",
            text: "Ação",
            editable: false,
            formatter: actionFormatter
        },
    ]

    return (
        <div className="cadastro-motivo-container">

            {isLoading ? <div style={{ height: "500px" }} className="d-flex justify-content-center align-items-center"><ReactLoading type="spin" width={128} height={128} color="#FFFFFF" /> </div> :
                <div className="cadastro-motivo-wrap">
                    <span className="cadastro-motivo-title">Cadastro Motivos</span>
                    <div className="cadastro-motivo-inputs">
                        <div>
                            <CustomSelectPicker ID="idNaoConformeSelect" classname="col-3" dict={selectData} title="Não conforme" onChangeEvent={(e) => fillData(e?.value)} />
                        </div>
                    </div>
                    <div className="row cadastro-motivo-table">
                        <div className="cadastro-motivo-table-nc">
                            <CustomTable customcolumns={columnsNaoConforme} customdata={tableData} />
                            <div className="cadastro-motivo-table-buttons">
                                <button className="btn cadastro-motivo-table-bt" style={{ margin: "0", padding: "5px 0 0 0" }} onClick={cadastrarNaoConforme}><PlusSVG width={32} height={32} fill="#18CE0F" /></button>
                            </div>
                        </div>
                        <div style={{ width: "4%" }}></div>
                        <div className="cadastro-motivo-table-ca">
                            <CustomTable customcolumns={columnsCausa} customdata={tableData} />
                            <div className="cadastro-motivo-table-buttons">
                                <button className="btn cadastro-motivo-table-bt" style={{ margin: "0", padding: "5px 0 0 0" }} onClick={cadastrarCausa}><PlusSVG width={32} height={32} fill="#18CE0F" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CadastroMotivo;