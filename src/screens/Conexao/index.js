import React, { useState } from 'react';
import './style.css';

import { SecurityConfig } from '../../services/SecurityConfig';
import { ApiConnection } from '../../services/Jost/Api/Connection/Api';

import { ReactComponent as PluvSVG } from '../../assets/plug.svg';

const Conexao = () => {

    const [logs, setLogs] = useState("");

    const testConnection = async () => {

        let config = await SecurityConfig.getConfigWS();
        setLogs(`Webservice: ${config} \n\n`);
        setLogs(p => [...p, `Get connection string...\n\n`]);
        let connectionstring = await ApiConnection.getConnection();

        //await new Promise(r => setTimeout(r, 2000));
        setLogs(p => [...p, `Connection String:\n`]);
        setLogs(p => [...p, `Server: ${connectionstring?.data?.server}\n`]);
        setLogs(p => [...p, `Database: ${connectionstring?.data?.database}\n`]);
        setLogs(p => [...p, `UID: ${connectionstring?.data?.userID}\n\n`]);
        setLogs(p => [...p, "Open connection...\n"]);
        let resp = await ApiConnection.testConnection();
        setLogs(p => [...p, `Response: ${resp?.message ?? "Connection failed."}`]);
    }

    return (
        <div className="conexao-container">
            <div className="conexao-panel">
                <div className="card" style={{ width: "100%", height: "90%" }}>
                    <div className="card-header conexao-card-header">
                        <span>TEST LOGS...</span>
                        <div style={{ width: "70px" }}>
                            <button className="btn button-test" onClick={() => testConnection()}><i><PluvSVG width={31} height={31} fill="#FFF" /></i></button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-body" style={{ whiteSpace: "pre-line" }}>{logs}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Conexao;