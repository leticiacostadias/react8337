import React from 'react';
import Widget from './index';
import renderer from 'react-test-renderer';

test('Teste do componente Widget', () => {
  const widget = renderer.create(
    <Widget>
      <h1>Título do widget</h1>
    </Widget>
  );
  let arvoreDOM = widget.toJSON();

  expect(arvoreDOM).toMatchSnapshot();
});