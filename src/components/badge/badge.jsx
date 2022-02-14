import React from 'react'

import './badge.css'

const Badge = props => {
    return (
        /* Dependiendo del props que obtenga recibira un color */
        <span className={`badge badge-${props.type}`}>
            {props.content}
        </span>
    )
}

export default Badge