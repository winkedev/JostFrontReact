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
import Swal from 'sweetalert2';

const CadastroMotivo = () => {

    const refSelectMotivo = useRef();

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

        if (resp?.data?.length > 0) {
            setFullMotivos(resp.data);
            fillSelect(resp.data);

            let currentSelectValue = refSelectMotivo.current.select.getValue();
            fillDataAfterRefresh(currentSelectValue.length > 0 ? currentSelectValue[0].value : -1, resp.data);
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
            }
        })

        setTableData(tableData);
    }

    const fillDataAfterRefresh = (e, refreshData) => {

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

    const mountEditNaoConforme = () => {
        return "<div class='cadastro-motivo-edit-inputs-container'>" +
            "<div class='cadastro-motivo-edit-inputs'>" +
            "<div class='input-group-prepend'>" +
            "<span class='input-group-text' id='basic-addon1'>Não conforme: </span>" +
            "</div>" +
            "<input id='id-input-descricao' type='text' class='form-control' placeholder='Descrição...' value='" + currentSelectMotivo.descricao + "' aria-label='Username' aria-describedby='basic-addon1' />" +
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

    const ediNaoConforme = async () => {

        let currentSelectValue = refSelectMotivo.current.select.getValue();

        if (currentSelectValue == null || currentSelectValue.length == 0) {
            await swalMessagePopup("Aviso", "É necessario selecionar não conforme para editar.", "warning");
            return;
        }

        let resp = await swalConfirmPopup(
            "Editar",
            "",
            "warning",
            "Confirmar",
            null,
            "Cancelar",
            false,
            mountEditNaoConforme(),
            true,
            () => {
                let value = document.getElementById("id-input-descricao").value;

                if (value != null && value.length > 0) {
                    let motivoToEdit = clone(currentSelectMotivo);
                    motivoToEdit.descricao = value;

                    return ApiMotivo.saveUpdate(motivoToEdit).then(r => {
                        if (r?.sucess) {
                            return true;
                        }

                        return false;
                    })
                }
                else {
                    return swalMessagePopup("Erro", "Erro ao atualizar não conforme.", "error");
                }
            }
        );

        if (resp.isConfirmed) {
            await swalMessagePopup("Sucesso", "Não conforme atualizado com sucesso.", "success");
            await consumeMotivosAndFulltable();
            refSelectMotivo.current.select.clearValue();
        }

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
                return ApiMotivo.deleteN2({ id: row.idN2 }).then(r => {
                    console.log(r);
                    if (r?.sucess) {
                        return true;
                    }
                    return false;
                });
            }
        )

        if (resp.isConfirmed) {
            await consumeMotivosAndFulltable();
        }
        else if (resp.isDenied) {
            await swalMessagePopup("Erro", "Erro ao excluir causa.", "error");
        }
    }

    const deleteNaoConforme = async () => {

        let currentSelectValue = refSelectMotivo.current.select.getValue();

        if (currentSelectValue == null || currentSelectValue.length == 0) {
            await swalMessagePopup("Aviso", "É necessario selecionar não conforme para excluir.", "warning");
            return;
        }

        let resp = await swalConfirmPopup(
            'Excluir',
            `Deseja excluir ${currentSelectMotivo.descricao} permanentemente?`,
            'warning',
            "Confirmar",
            null,
            null,
            false,
            null,
            true,
            () => {
                return ApiMotivo.deleteN1({ id: currentSelectMotivo.id }).then(r => {
                    console.log(r);
                    if (r?.sucess) {
                        return true;
                    }
                    else {
                        return swalMessagePopup("Erro", "Erro ao excluir não conforme.", "error");
                    }
                });
            }
        )

        if (resp.isConfirmed) {
            await swalMessagePopup("Sucesso", "Não conforme excluido com sucesso.", "success");
            await consumeMotivosAndFulltable();
            refSelectMotivo.current.select.clearValue();
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

        let currentSelectValue = refSelectMotivo.current.select.getValue();

        if (currentSelectValue == null || currentSelectValue.length == 0) {
            await swalMessagePopup("Aviso", "É necessario selecionar não conforme para cadastrar uma nova causa.", "warning");
            return;
        }

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

                    return ApiMotivo.saveUpdate(currentMotivo).then(r => {
                        if (r?.sucess) {
                            return true;
                        }
                        return false;
                    })
                }
            }
        );

        if (resp.isConfirmed) {
            await swalMessagePopup("Sucesso", "Causa cadastrada com sucesso.", "success");
            await consumeMotivosAndFulltable();
        }
        else if (resp.isDenied) {
            await swalMessagePopup("Erro", "Erro ao cadastrar causa.", "error");
        }
    }

    var columnsCausa = [
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
                        <CustomSelectPicker REF={refSelectMotivo} ID="idNaoConformeSelect" classname="col-3" dict={selectData} title="Não conforme" onChangeEvent={(e) => fillData(e?.value)} />
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <button onClick={ediNaoConforme} className="btn" style={{ padding: "3px" }}><EditSVG width={32} height={32} fill="#01579B"></EditSVG></button>
                            <button onClick={deleteNaoConforme} className="btn" style={{ padding: "3px" }}><DeleteSVG width={32} height={32} fill="#FF0000"></DeleteSVG></button>
                        </div>
                        <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <button onClick={cadastrarNaoConforme} className="btn bg-primary-green color-white cadastro-motivo-table-bt"><span style={{ paddingRight: "4px" }}>Novo Não Conforme</span><PlusSVG width={26} height={26} fill="#FFFFFF"></PlusSVG></button>
                        </div>
                    </div>
                    <div className="cadastro-motivo-table">
                        <CustomTable customcolumns={columnsCausa} customdata={tableData} />
                        <div className="cadastro-motivo-table-buttons" >
                            <button className="btn bg-primary-green color-white cadastro-motivo-table-bt" onClick={cadastrarCausa}><span>Nova causa</span> <PlusSVG width={26} height={26} fill="#FFFFFF" /></button>
                        </div>
                    </div>
                </div >
            }
        </div >
    )
}

export default CadastroMotivo;