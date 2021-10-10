import React from 'react'
import "./Modal.css"
import Button from "../Button/Button"

const Modal = (props) => {
    const showHideClassName = props.show ? "modal-container display-block" : "modal-container display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-window">
                {props.children}
                <Button onClick={props.handleClose} style={{"margin-top": "20px"}}>Close</Button>
            </div>
        </div>
    )
}

export default Modal
