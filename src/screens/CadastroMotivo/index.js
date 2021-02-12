import React from 'react';
import './style.css';

import CustomSelectPicker from '../../components/CustomSelectPicker';
import CustomTable from '../../components/CustomTable';

const CadastroMotivo = () => {

    return (
        <div className="wrapper">
            <div className="sidebar" data-color="jost">

                <div className="logo">
                    <a href="#" className="simple-text logo-mini">
                        <img src="./assets/img/jost-logo1.png" style={{ backgroundColor: "gray" }} />
                    </a>
                    <a href="#" className="simple-text logo-normal">
                        Jost
        </a>
                    <div className="navbar-minimize">
                        <button id="minimizeSidebar" className="btn btn-simple btn-icon btn-neutral btn-round"
                            style={{ color: "gray !important" }}>
                            <i className="now-ui-icons text_align-center visible-on-sidebar-regular"></i>
                            <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini"></i>
                        </button>
                    </div>
                </div>

                <div className="sidebar-wrapper">
                    <div className="user">
                        <div className="photo">
                            <img src="./assets/img/default-avatar.png" />
                        </div>
                        <div className="info">
                            <a data-toggle="collapse" href="#collapseExample" className="collapsed">
                                <span>
                                    s
                                    <b className="caret"></b>
                                </span>
                            </a>
                            <div className="clearfix"></div>
                            <div className="collapse" id="collapseExample">
                                <ul className="nav">
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">MP</span>
                                            <span className="sidebar-normal">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">EP</span>
                                            <span className="sidebar-normal">Edit Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="sidebar-mini-icon">S</span>
                                            <span className="sidebar-normal">Settings</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <ul className="nav">
                        <li>
                            <a data-toggle="collapse" data-target="#Cadastros" href="">
                                <i className="now-ui-icons files_box"></i>
                                <p>
                                    Cadastro
                <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="Cadastros">
                                <ul className="nav">
                                    <li ng-className="{ active: isActive('/Cadastros/Motivos')}">
                                        <a style={{ padding: "11px 0 8px 12px" }} href="#/Cadastro/Motivos ">
                                            <i className="now-ui-icons files_single-copy-04"></i>
                                            <span className="sidebar-normal">Motivos</span>
                                        </a>
                                    </li>
                                    <li ng-className="{ active: isActive('/Cadastros/Paradas')}">
                                        <a style={{ padding: "11px 0 8px 12px;" }} href="/index.html#/Cadastro/Paradas">
                                            <i className="now-ui-icons business_globe"></i>
                                            <span className="sidebar-normal">Inspeção Extra</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a data-toggle="collapse" data-target="#Operacao" href="">
                                <i className="now-ui-icons business_chart-bar-32"></i>
                                <p>
                                    Operações
                <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="Operacao">
                                <ul className="nav">
                                    <li ng-className="{ active: isActive('/Operacao/ConsultaMedicao')}">
                                        <a style={{ padding: "11px 0 8px 12px" }} href="#/Operacao/ConsultaMedicao">
                                            <i className="now-ui-icons design_bullet-list-67"></i>
                                            <span className="sidebar-normal">Consulta Medições</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a data-toggle="collapse" data-target="#Relatorio" href="">
                                <i className="now-ui-icons files_single-copy-04"></i>
                                <p>
                                    Relatórios
                <b className="caret"></b>
                                </p>
                            </a>
                            <div className="collapse " id="Relatorio">
                                <ul className="nav">
                                    <li ng-className="{ active: isActive('/Relatorio/Inspecao')}">
                                        <a style={{ padding: "11px 0 8px 12px" }} href="#/Relatorio/Inspecao">
                                            <i className="now-ui-icons files_paper"></i>
                                            <span className="sidebar-normal">Relatório de Inspeção</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-panel">

                <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
                    <div className="container-fluid">
                        <div className="navbar-wrapper" style={{ position: "absolute", right: "0", top: "7px" }} id="goToTop">
                            <img src="./././assets/img/spi_logo.png" style={{ height: "50px" }} />
                        </div>
                    </div>
                </nav>

                <div className="panel-header-sm" style={{ height: "60px", backgroundColor: "#222326" }}></div>

                <div ng-view className="content geralPadding pt-3">
                </div>
            </div>
        </div>
    )
}

export default CadastroMotivo;