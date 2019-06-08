import React from 'react';

import './Cabecalho.css';

class Cabecalho extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <header>
        <div>
          <a href="/">
            <h1>Twitelum</h1>
          </a>
        </div>
        <nav>
          <ul>
            <li>
              <a href="/mensagens">Mensagens</a>
            </li>
            <li>
              <a href="/feed">Feed</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Cabecalho;
