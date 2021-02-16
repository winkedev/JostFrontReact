import React from 'react';
import './style.css';


const CustomPopup = ({ title, content, dataTargetID }) => {
    return (
        <div>
            {/* <a data-toggle="modal" data-target="#popupCentered">
                Teste
            </a> */}

            <div className="modal fade" id={dataTargetID} tabindex="-1" role="dialog" aria-labelledby="popupCenteredTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ whiteSpace: "pre-line" }}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomPopup;