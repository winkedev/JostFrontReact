import React from 'react';
import './style.css';

import { ReactComponent as OkSVG } from '../../assets/ok.svg';
import { ReactComponent as ErrorSVG } from '../../assets/error.svg';
import { ReactComponent as WarningSVG } from '../../assets/warning.svg';

const CustomPopup = ({ title, content, dataTargetID, isOk, isError, isWarning }) => {
    return (
        <div>
            {/* <a data-toggle="modal" data-target="#popupCentered">
                Teste
            </a> */}

            <div className="modal fade" id={dataTargetID} tabIndex="-1" role="dialog" aria-labelledby="popupCenteredTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{ border: "none" }} >
                        <div className={isOk ? "modal-header bg-primary-green border-none" : isError ? "modal-header bg-primary-red border-none" : isWarning ? "modal-header bg-primary-orange border-none" : "modal-header"}>
                            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ whiteSpace: "pre-line", display: "flex", flexDirection: "column" }}>
                            <span>{content}</span>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "30px" }}>
                                {isOk ?
                                    <OkSVG width="128px" height="128px" fill="#18CE0F" /> :
                                    isError ? <ErrorSVG width="128px" height="128px" fill="#FF4D4D" /> :
                                        isWarning ?
                                            <WarningSVG width="128px" height="128px" fill="#FFB236" /> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomPopup;