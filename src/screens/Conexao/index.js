import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import ReactLoading from 'react-loading';
import ReactSwitchButton from 'react-switch';

import { SecurityConfig } from '../../services/SecurityConfig';
import { ApiConnection } from '../../services/Jost/Api/Connection/Api';

import CustomPopup from '../../components/CustomPopup';
import { SwalPopup } from '../../components/SwalPopup';
import { swalMessagePopup } from '../../components/SwalPopup';

import { ReactComponent as PluvSVG } from '../../assets/plug.svg';

const Conexao = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isWSConnected, setIsWSConnected] = useState(false);
    const [isCSConnected, setIsCSConnected] = useState(false);
    const [isOPConnected, setIsOPConnected] = useState(false);
    const [isREConnected, setIsREConnected] = useState(false);

    const [currentWSString, setCurrentWSString] = useState("");
    const [currentCSString, setCurrentCSString] = useState("");
    const [currentOPString, setCurrentOPString] = useState("");
    const [currentREString, setCurrentREString] = useState("");

    const [isLogs, setIsLogs] = useState(false);
    const refButton = useRef(null);

    const disableStates = () => {
        setIsWSConnected(false);
        setIsCSConnected(false);
        setIsOPConnected(false);
        setIsREConnected(false);

        setCurrentWSString("");
        setCurrentCSString("");
        setCurrentOPString("");
        setCurrentREString("");
    }

    useEffect(() => {
        setIsLogs(SecurityConfig.getEnableLogs() == 'true' ? true : false);
    }, [])

    const testConnection = async () => {

        try {
            setIsLoading(true);
            disableStates();

            let config = await SecurityConfig.getConfigWS();

            if (config) {
                await new Promise(r => setTimeout(r, 1000));
                setIsWSConnected(true);
                setCurrentWSString(config);
            } else {
                return;
            }

            let connectionstring = await ApiConnection.getConnection();

            if (connectionstring) {
                await new Promise(r => setTimeout(r, 1000));
                setIsCSConnected(true);
                let st = `Server: ${connectionstring?.data?.server}\n Database: ${connectionstring?.data?.database}\n UID: ${connectionstring?.data?.userID}`;
                setCurrentCSString(st);
            } else {
                return;
            }

            await new Promise(r => setTimeout(r, 1000));
            setIsOPConnected(true);
            setCurrentOPString("Open Connection..")

            let resp = await ApiConnection.testConnection();

            if (resp) {
                await new Promise(r => setTimeout(r, 1000));
                setIsREConnected(true);
                setCurrentREString(resp?.message);
            }
        } catch (e) {

        } finally {
            setIsLoading(false);
            swalMessagePopup('Teste Completo', '', "success", 'OK', '', false);
        }

    }

    const handleCheck = (e) => {
        SecurityConfig.setEnableLogs(e);
        setIsLogs(e);
    }

    return (
        <div className="conexao-container">
            <div className="">
                <h4>Conexão</h4>
            </div>
            <div className="conexao-panel">
                <div className="card" style={{ width: "100%", height: "90%", backgroundColor: "transparent" }}>
                    <div className="card-header conexao-card-header">
                        <h5>TEST...</h5>
                        <div style={{ width: "70px" }}>
                            <button className="btn button-test" disabled={isLoading} onClick={() => testConnection()}>
                                <i>
                                    {isLoading ?
                                        <div className="conexao-loading"><ReactLoading type="spin" width="31px" height="31px" color="#FFF" /></div> :
                                        <PluvSVG width={31} height={31} fill="#FFF" />
                                    }
                                </i>
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        {/* <div className="card-body" style={{ whiteSpace: "pre-line" }}>{logs}</div> */}
                        <div className="conexao-card-body">
                            <div style={{ display: "none" }} ref={refButton} data-toggle="modal" data-target="#testOkModal"></div>
                            <CustomPopup dataTargetID="testOkModal" title="Test Finish" content={isWSConnected && isCSConnected && isOPConnected && isREConnected ? "Teste realizado com sucesso" : "Erro ao realizar teste."} isOk={isWSConnected && isCSConnected && isOPConnected && isREConnected} isError={!isWSConnected || !isCSConnected || !isOPConnected || !isREConnected} />

                            <button onClick={() => swalMessagePopup('WS', currentWSString, '', 'OK', '', true)} id="conexao-button" className={isWSConnected ? "active" : ""} >WS</button>
                            <div id="conexao-line" className={isWSConnected ? "active" : ""}></div>

                            <button onClick={() => swalMessagePopup('CS', currentCSString, '', 'OK', '', true)} id="conexao-button" className={isCSConnected ? "active" : ""} >CS</button>
                            <div id="conexao-line" className={isCSConnected ? "active" : ""}></div>

                            <button onClick={() => swalMessagePopup('OP', currentOPString, '', 'OK', '', true)} id="conexao-button" className={isOPConnected ? "active" : ""} >OP</button>
                            <div id="conexao-line" className={isOPConnected ? "active" : ""}></div>

                            <button onClick={() => swalMessagePopup('RE', currentREString, '', 'OK', '', true)} id="conexao-button" className={isREConnected ? "active" : ""} >RE</button>

                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="conexao-card-footer">
                            <span>Logs</span>
                            <ReactSwitchButton onColor="#18CE0F"
                                onHandleColor="#18CE0F"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={20}
                                width={48}
                                className="react-switch"
                                id="material-switch"
                                checked={isLogs}
                                onChange={handleCheck} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conexao;