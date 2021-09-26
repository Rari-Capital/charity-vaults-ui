import React from 'react'
import "./Input.css"

const InputHeader = (props) => {
    return (
        <h1 className="input-component-header">{props.value}</h1>
    )
}

export default InputHeader
