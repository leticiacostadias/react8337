import React from 'react'
import propTypes from 'prop-types';
import './cabecalho.css'

const Cabecalho = (props) => (
    <header className="cabecalho">
        <div className="cabecalho__container container">
            <h1 className="cabecalho__logo">
                <a href="/">Twitelum</a>
            </h1>
            { props.children }
        </div>
    </header>
);

Cabecalho.propTypes = {
    children: propTypes.node
}

Cabecalho.defaultProps = {
    children: ''
}

export default Cabecalho