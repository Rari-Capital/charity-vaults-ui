import React from 'react'
import "./Input.css"

const Input = (props) => {
    return (
        <input
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            className="rari-input"
            placeholder={props.placeholder}
        />
    )
}

export default Input
