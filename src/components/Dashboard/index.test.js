import React from 'react';
import Dashboard from './index';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Dashboard', () => {
  it('deve renderizar filhos', () => {
    const dashboard = renderer.create(
      <Dashboard>
        <h1>Título do dashboard</h1>
      </Dashboard>
    );
    const arvoreDOM = dashboard.toJSON();
  
    expect(arvoreDOM).toMatchSnapshot();
  });

  it('deve adicionar classe de posicionamento', () => {
    const dashboard = shallow(
      <Dashboard posicao="centro">
        <h1>Título do dashboard</h1>
      </Dashboard>
    );
    const dashboardCentro = dashboard.find('.dashboard__centro');

    expect(dashboardCentro.length).toBe(1);
  });
});