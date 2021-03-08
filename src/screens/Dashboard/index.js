import React, { useState, useRef, useContext } from 'react'
import './style.css';

import { useHistory } from 'react-router-dom';

import { ReactComponent as HomeSVG } from '../../assets/home.svg';
import { ReactComponent as FileSVG } from '../../assets/filebold.svg';
import { ReactComponent as FileEditSVG } from '../../assets/fileedit.svg';
import { ReactComponent as FileSearchSVG } from '../../assets/filesearchbold.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import { ReactComponent as LogoutSVG } from '../../assets/logout.svg';
import { ReactComponent as PlugSVG } from '../../assets/plug.svg';
import { ReactComponent as EasyQualitySVG } from '../../assets/easy-quality.svg';
import { ReactComponent as FileReasonSVG } from '../../assets/file-reason.svg';
import { ReactComponent as FileError } from '../../assets/fileerror.svg';

import Logo from '../../assets/jost-logo1.png';
import SPILogoFE from '../../assets/spi_logo_fe.png';
import DashboardDefault from '../DashboardDefault';
import ConsultaMedicao from '../ConsultaMedicao';
import Conexao from '../Conexao';
import CadastraMedicao from '../CadastraMedicao';
import CadastroMotivo from '../CadastroMotivo';
import ConsultaItemReprovado from '../ConsultaItemReprovado';

import { SecurityConfig } from '../../services/SecurityConfig';

const Dashboard = () => {
    const nav = useHistory();
    const refSidebarUsername = useRef(null);
    const refSidebarMedicao = useRef(null);

    const [isActive, setIsActive] = useState(true);
    const [indexActive, setIndexActive] = useState(0);

    const setActiveScreen = (index) => {
        switch (index) {
            case 0:
                return <DashboardDefault />
            case 1:
                return <CadastroMotivo />
            case 2:
                return <ConsultaMedicao />
            case 3:
                return <CadastraMedicao />
            case 4:
                return <ConsultaItemReprovado />
            case 99:
                return <Conexao />
            default:
                console.log(index);
        }
    }

    const doLogout = () => {
        nav.push('/');
    }

    const isAdminRole = () => {
        return SecurityConfig.getUser()?.type == '0';
    }

    const onMouseLeaveSidebar = () => {

        setIsActive(true);

        let areaExpandedUsername = document.getElementById('sidebar-username').getAttribute('aria-expanded');
        let areaExpandedMedicao = document.getElementById('sidebar-medicao').getAttribute('aria-expanded');

        if (areaExpandedUsername == 'true') {
            refSidebarUsername.current.click();
        }

        if (areaExpandedMedicao == 'true') {
            refSidebarMedicao.current.click();
        }
    }

    return (
        <div className="dashboard-container">
            <div id="dashboard-sidebar">
                <div id="sidebar-wrapper" className={isActive ? "active" : ""} onMouseOver={() => setIsActive(false)} onMouseLeave={onMouseLeaveSidebar}>
                    <nav id="sidebar" className={isActive ? "active" : ""}>
                        <div className="sidebar-logo">
                            <img src={Logo} style={{ borderRadius: "5px" }} />
                            <span>JOST</span>
                        </div>
                        <div className="sidebar-header">
                            <div className="sidebar-header-box1">
                                <i><UserSVG width={31} height={31} fill="#FFFFFF" opacity="0.5" /></i>
                                <span>{SecurityConfig.getUser()?.username ?? "?"}</span>
                                <a id="sidebar-username" ref={refSidebarUsername} href="#homeSubmenu"
                                    data-toggle="collapse"
                                    aria-expanded="false" style={{ paddingLeft: "15px", display: "flex", justifyContent: "center", alignItems: "center" }} className="dropdown-toggle">
                                </a>
                            </div>
                            <div className="collapse sidebar-header-box2" id="homeSubmenu">
                                <ul className="list-unstyled sidebar-collapsed-list">
                                    <li>
                                        <a href="javascript:void(0);" onClick={doLogout}>
                                            <i>
                                                <LogoutSVG width={31} height={31} fill="#FFFFFF" opacity="0.5" />
                                            </i>
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="sidebar-body">
                            <ul className="list-unstyled components">
                                <li>
                                    <a href="javascript:void(0);" onClick={() => setIndexActive(0)}>
                                        <i>
                                            <HomeSVG width={31} height={31} opacity="0.5" fill="#FFFFFF" />
                                        </i>
                                        <span>Home</span>
                                    </a>
                                </li>
                                {isAdminRole() ?
                                    <li>
                                        <a href="javascript:void(0);" onClick={() => setIndexActive(1)}>
                                            <i>
                                                <FileReasonSVG width={31} height={31} opacity="0.5" fill="#FFFFFF" />
                                            </i>
                                            <span>Motivos</span>
                                        </a>
                                    </li>
                                    : ""}
                                <li>
                                    <a id="sidebar-medicao" ref={refSidebarMedicao} href="#homeSubmenuMedicao" data-toggle="collapse" aria-expanded="false">
                                        <i>
                                            <FileSVG width={31} height={31} opacity="0.5" fill="#FFFFFF" />
                                        </i>
                                        <span>Medição</span>
                                        <i className="dropdown-toggle" style={{ paddingLeft: "15px", display: "flex", justifyContent: "center", alignItems: "center" }}> </i>
                                    </a>
                                    <div className="collapse" id="homeSubmenuMedicao">
                                        <ul className="list-unstyled sidebar-collapsed-list">
                                            <li>
                                                <a href="javascript:void(0);" onClick={() => setIndexActive(2)}>
                                                    <i>
                                                        <FileSearchSVG width={31} height={31} fill="#FFFFFF" opacity="0.5" />
                                                    </i>
                                                    <span>Consulta Medição</span>
                                                </a>
                                            </li>
                                            {isAdminRole() ?
                                                <li>
                                                    <a href="javascript:void(0);" onClick={() => setIndexActive(3)}>
                                                        <i>
                                                            <FileEditSVG width={31} height={31} fill="#FFFFFF" opacity="0.5" />
                                                        </i>
                                                        <span>Cadastra Medição</span>
                                                    </a>
                                                </li> : ""}
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" onClick={() => setIndexActive(4)}>
                                        <i>
                                            <FileError width={31} height={31} opacity="0.5" fill="#FFFFFF" />
                                        </i>
                                        <span>Reprovados</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" onClick={() => setIndexActive(99)}>
                                        <i>
                                            <PlugSVG width={31} height={31} opacity="0.5" fill="#FFFFFF" />
                                        </i>
                                        <span>Testar Conexão</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div id="dashboard-main">
                <nav id={isActive ? "db-navbar-active" : ""} className="navbar db-navbar">
                    <i><img src={SPILogoFE} width={145} height={66} style={{ marginRight: "20px" }} /></i>
                    <EasyQualitySVG width="145px" height="66px" />
                </nav>
                <div id="dashboard-main-content">
                    {
                        setActiveScreen(indexActive)
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
