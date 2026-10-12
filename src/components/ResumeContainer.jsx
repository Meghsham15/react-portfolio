import React from "react";

const RESUME_DOC_ID = "1OBncUErdJSoyGLpi-k-0GyqTz0C4hc8o2_nXcAk_k1g";
const RESUME_PREVIEW_URL = `https://docs.google.com/document/d/${RESUME_DOC_ID}/preview`;
const RESUME_OPEN_URL = `https://docs.google.com/document/d/${RESUME_DOC_ID}/edit?usp=sharing`;

function ResumeContainer() {
    function handleClose() {
        document.querySelector("#resumeCon").classList.add("display");
    }

    function handleBackdropClick(event) {
        if (event.target.id === "resumeCon") {
            handleClose();
        }
    }

    return (
        <div id="resumeCon" className="resumeCont display" onClick={handleBackdropClick}>
            <div className="resumeViewer">
                <iframe
                    title="Resume"
                    src={RESUME_PREVIEW_URL}
                    allow="fullscreen"
                />
                <a
                    className="resumeOpenTab"
                    href={RESUME_OPEN_URL}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open in Google Docs
                </a>
            </div>
            <button type="button" className="resumeClose" onClick={handleClose} id="resumeD" aria-label="Close resume">
                <span>⨯</span>
            </button>
        </div>
    );
}

export default ResumeContainer;
