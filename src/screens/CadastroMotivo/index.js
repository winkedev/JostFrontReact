import React, { useState, useEffect, useRef } from 'react';
import './style.css';

import { ApiMotivo } from '../../services/Jost/Api/Motivo/Api';

import ReactLoading from 'react-loading';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';

import { ReactComponent as DeleteSVG } from '../../assets/delete.svg';
import { ReactComponent as EditSVG } from '../../assets/edit.svg';

const CadastroMotivo = () => {

    const refModal = useRef(null);

    const [isLoading, setIsloading] = useState(true);
    const [fullMotivos, setFullMotivos] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [currentSelectMotivo, setCurrentSelectMotivo] = useState(null);
    const [currentSelectedRow, setCurrentSelectedRow] = useState(null);
    const [tableData, setTableData] = useState([]);

    useEffect(async () => {

        let resp = await ApiMotivo.getAll();

        if (resp.data != null && resp.data.length > 0) {
            setFullMotivos(resp.data);

            let respdata = [];

            Object.keys(resp.data).map((k, v) => {
                respdata.push({
                    key: resp.data[v].id,
                    value: resp.data[v].descricao
                })
            })

            setSelectData(respdata);
        }

        setIsloading(false);

    }, [])

    const fillData = (e) => {
        let tableData = [];

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

    const actionFormatter = (cell, row) => {
        return (
            <div>
                <button className="btn" onClick={() => setCurrentSelectedRow(row)} data-toggle="modal" data-target="#EditCausaModal" data-backdrop="static" data-keyboard="false" style={{ width: "64px" }} >
                    <EditSVG fill="#01579B" width={32} height={32} />
                </button>
                <button className="btn" style={{ width: "64px" }}>
                    <DeleteSVG fill="red" width={32} height={32} />
                </button>
            </div>
        )
    }

    const editCausa = () => {

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

                    <h4>Cadastro Motivos</h4>
                    <div className="cadastro-motivo-inputs col">
                        <div className="row">
                            <CustomSelectPicker initWithEmptyValue classname="col-3" dict={selectData} title="Não conforme" onChangeEvent={(e) => fillData(e.target.value)} />
                        </div>
                        <div className="row justify-content-end cadastro-motivo-buttons">
                            <button className="btn col-2 bg-primary-green color-white" data-toggle="modal" data-target="#cadastroModal" data-backdrop="static" data-keyboard="false">Cadastrar Não Conforme</button>
                            <button disabled={currentSelectMotivo == null || currentSelectMotivo.id <= 0} className="btn col-2 bg-primary-orange color-white" data-toggle="modal" data-target="#cadastroCausaModal" data-backdrop="static" data-keyboard="false">Cadastrar Causa</button>
                        </div>
                    </div>
                    <div className="row cadastro-motivo-table">
                        <div className="col-12">
                            <CustomTable customcolumns={columns} customdata={tableData} />
                        </div>
                    </div>

                    {/* Modal Não Conforme */}

                    <div className="modal fade" id="cadastroModal" tabIndex="-1" role="dialog" aria-labelledby="popupCenteredTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="cadastro-motivo-modal">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Cadastro Não Conforme</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body cadastro-motivo-modal-body">
                                        <div className="row cadastro-motivo-modal-inputs">
                                            <div class="col-4 input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Não conforme: </span>
                                            </div>
                                            <input type="text" class="col-7 form-control " placeholder="Descrição..." aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                        <div></div>
                                        <div className="row cadastro-motivo-modal-buttons">
                                            <button className="btn bg-primary-green color-white">Cadastrar</button>
                                            <button className="btn bg-primary-red color-white" data-dismiss="modal">Sair</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Causa */}

                    <div className="modal fade" id="cadastroCausaModal" tabIndex="-1" role="dialog" aria-labelledby="popupCenteredTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="cadastro-motivo-modal">
                                    <div className="modal-header cadastro-motivo-modal-header">
                                        <div className="cadastro-motivo-modal-header-title">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Cadastro Causa</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <h6 className="cadastro-motivo-modal-header-subtitle" id="exampleModalsubtitle">Não conforme: <strong>{currentSelectMotivo?.descricao}</strong></h6>
                                    </div>
                                    <div className="modal-body cadastro-motivo-modal-body" style={{ whiteSpace: "pre-line", display: "flex", flexDirection: "column" }}>
                                        <div className="row cadastro-motivo-modal-inputs-causa">
                                            <div class="col-3 input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Causa: </span>
                                            </div>
                                            <input type="text" class="col-9 form-control " placeholder="Descrição..." aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                        <div className="row cadastro-motivo-modal-buttons">
                                            <button className="btn bg-primary-green color-white">Cadastrar</button>
                                            <button className="btn bg-primary-red color-white" data-dismiss="modal">Sair</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Edit Causa */}

                    <div className="modal fade" id="EditCausaModal" tabIndex="-1" role="dialog" aria-labelledby="popupCenteredTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="cadastro-motivo-modal">
                                    <div className="modal-header cadastro-motivo-modal-header">
                                        <div className="cadastro-motivo-modal-header-title">
                                            <h4 className="modal-title" id="exampleModalLongTitle">Editar Causa</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <h6 className="cadastro-motivo-modal-header-subtitle" id="exampleModalsubtitle">Não conforme: <strong>{currentSelectMotivo?.descricao}</strong></h6>
                                    </div>
                                    <div className="modal-body cadastro-motivo-modal-body" style={{ whiteSpace: "pre-line", display: "flex", flexDirection: "column" }}>
                                        <div className="row cadastro-motivo-modal-inputs-causa">
                                            <div class="col-3 input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">Causa: </span>
                                            </div>
                                            <input type="text" class="col-9 form-control " placeholder="Descrição..." aria-label="Username" defaultValue={currentSelectedRow?.descricaoN2} aria-describedby="basic-addon1" />
                                        </div>
                                        <div className="row cadastro-motivo-modal-buttons">
                                            <button className="btn bg-primary-green color-white" onClick={editCausa}>Alterar</button>
                                            <button className="btn bg-primary-red color-white" data-dismiss="modal">Sair</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default CadastroMotivo;