import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import { swalMessagePopup, swalConfirmPopup } from '../../components/SwalPopup';
import Swal from 'sweetalert2';
import { clone } from '../../utils/CloneObject';

import { ApiMotivo } from '../../services/Jost/Api/Motivo/Api';

import ReactLoading from 'react-loading';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';

import { ReactComponent as DeleteSVG } from '../../assets/delete.svg';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';

const CadastroMotivo = () => {

    const refModal = useRef(null);

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
                    key: data[v].id,
                    value: data[v].descricao
                })
            })

            setSelectData(respdata);
        }
    }

    const fillData = (e) => {

        console.log(fullMotivos);
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
                    <EditSVG fill="#01579B" width={32} height={32} />
                </button>
                <button className="btn" disabled={row.idN2 == -1} onClick={() => deleteCausa(row)} style={{ width: "64px" }}>
                    <DeleteSVG fill="red" width={32} height={32} />
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

    var columns = [
        {
            dataField: "idN1",
            text: "IDN1",
            editable: false,
            hidden: true
        },
        {
            dataField: "idN2",
            text: "IDN2",
            editable: false,
            hidden: true
        },
        {
            dataField: "descricaoN1",
            text: "Não Conforme",
            editable: false
        },
        {
            dataField: "descricaoN2",
            text: "Causa",
            editable: false
        },
        {
            dataField: "id",
            text: "Ações",
            formatter: actionFormatter,
            editable: false
        }
    ]

    return (
        <div className="cadastro-motivo-container">



            <button id="bt-dismiss" style={{ display: "none" }} data-dismiss="modal" data-target="#EditCausaModal" ref={refModal} />
            {isLoading ? <div style={{ height: "500px" }} className="d-flex justify-content-center align-items-center"><ReactLoading type="spin" width={128} height={128} color="#FFFFFF" /> </div> :
                <div className="cadastro-motivo-wrap">
                    <span className="cadastro-motivo-title">Cadastro Motivos</span>
                    <div className="cadastro-motivo-inputs col">
                        <div className="row">
                            <CustomSelectPicker ID="idNaoConformeSelect" initWithEmptyValue classname="col-3" dict={selectData} title="Não conforme" onChangeEvent={(e) => fillData(e.target.value)} />
                        </div>
                        <div className="row justify-content-end cadastro-motivo-buttons">
                            <button className="btn col-2 bg-primary-green color-white" onClick={cadastrarNaoConforme}>Cadastrar Não Conforme</button>
                            <button disabled={currentSelectMotivo == null || currentSelectMotivo.id <= 0} className="btn col-2 bg-primary-orange color-white" onClick={cadastrarCausa}>Cadastrar Causa</button>
                        </div>
                    </div>
                    <div className="row cadastro-motivo-table">
                        <div className="col-12">
                            <CustomTable customcolumns={columns} customdata={tableData} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CadastroMotivo;