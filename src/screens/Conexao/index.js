import React, { useState } from 'react';
import './style.css';

import { SecurityConfig } from '../../services/SecurityConfig';
import { ApiConnection } from '../../services/Jost/Api/Connection/Api';

const Conexao = () => {

    const [logs, setLogs] = useState("");

    const testConnection = async () => {

        let config = await SecurityConfig.getConfigWS();
        setLogs(`WS: ${config}`);
        await new Promise(r => setTimeout(r, 2000));
        setLogs("Open connection...");
        await new Promise(r => setTimeout(r, 2000));
        let resp = await ApiConnection.testConnection();
        setLogs(`Reponse: ${resp?.message ?? "Connection failed."}`);
    }

    return (
        <div className="conexao-container">
            <div className="conexao-buttons">
                <button className="btn button-test" onClick={() => testConnection()}>Test connection</button>
            </div>
            <div className="conexao-panel">
                <div className="card" style={{ width: "100%", height: "90%" }}>
                    <div className="card-header">
                        TEST LOGS...
                    </div>
                    <div className="card-body">
                        <div className="card-body">{logs}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Conexao;