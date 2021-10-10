import React from 'react'
import "./Button.css"

const Button = (props) => {
    return (
        <button style={props.style} className={props.isDark ? "btn btn-dark" : "btn btn-green"}  onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;
