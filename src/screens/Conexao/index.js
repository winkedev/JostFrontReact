import React, { useState } from 'react';
import './style.css';
import ReactLoading from 'react-loading';

import { SecurityConfig } from '../../services/SecurityConfig';
import { ApiConnection } from '../../services/Jost/Api/Connection/Api';

import CustomPopup from '../../components/CustomPopup';

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
        }
    }

    return (
        <div className="conexao-container">
            <div className="">
                <h4>Conexão</h4>
            </div>
            <div className="conexao-panel">
                <div className="card" style={{ width: "100%", height: "90%" }}>
                    <div className="card-header conexao-card-header">
                        <h5>TEST...</h5>
                        <div style={{ width: "70px" }}>
                            <button className="btn button-test" onClick={() => testConnection()}>
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
                            <button id="conexao-button" className={isWSConnected ? "active" : ""} data-toggle="modal" data-target="#WSModal">WS</button>
                            <CustomPopup dataTargetID="WSModal" title="WebService" content={currentWSString} />
                            <div id="conexao-line" className={isWSConnected ? "active" : ""}></div>
                            <button id="conexao-button" className={isCSConnected ? "active" : ""} data-toggle="modal" data-target="#CSModal">CS</button>
                            <CustomPopup dataTargetID="CSModal" title="Connection String" content={currentCSString} />
                            <div id="conexao-line" className={isCSConnected ? "active" : ""}></div>
                            <button id="conexao-button" className={isOPConnected ? "active" : ""} data-toggle="modal" data-target="#OPModal">OP</button>
                            <CustomPopup dataTargetID="OPModal" title="Open Connection" content={currentOPString} />
                            <div id="conexao-line" className={isOPConnected ? "active" : ""}></div>
                            <button id="conexao-button" className={isREConnected ? "active" : ""} data-toggle="modal" data-target="#REModal">RE</button>
                            <CustomPopup dataTargetID="REModal" title="Response Connection" content={currentREString} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conexao;