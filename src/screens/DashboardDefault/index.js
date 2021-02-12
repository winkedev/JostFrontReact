import React from 'react'
import './style.css';
import JostLogoB from '../../assets/jost_LOGO OFICIAL.jpg';

const DashboardDefault = () => {
    return (
        <div className="db-default-container">
            <img src={JostLogoB} width="90%" height="90%" style={{ opacity: 0.1 }} />
        </div>
    )
}

export default DashboardDefault;
