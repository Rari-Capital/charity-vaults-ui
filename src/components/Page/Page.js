import React from 'react'
import "./Page.css"

const Page = (props) => {
    return (
        <div className="page-container">
            <div className="page-content">{props.children}</div>
            <div className="rari-link-container">
                <a className="rari-link" rel="noreferrer" href="https://rari.capital" target="_blank">
                    Rari Capital Website
                </a>
            </div>
        </div>
    )
}

export default Page;
