import React from 'react';
import Modal from './index';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

describe('Modal', () => {
  it('deve renderizar filhos', () => {
    const modal = renderer.create(
      <Modal estaAberto={true} fechaModal={() => {}}>
        <h1>Título do modal</h1>
      </Modal>
    );
    const arvoreDOM = modal.toJSON();

    expect(arvoreDOM).toMatchSnapshot();
  });

  it('deve ter uma classe de estado ativo quando estaAberto for true', () => {
    const modal = shallow(
      <Modal estaAberto={true} fechaModal={() => {}}>
        <h1>Título do modal</h1>
      </Modal>
    );

    const modalOverlay = modal.find('.modal');

    expect(modalOverlay.hasClass('modal--active')).toBeTruthy();
  });

  it('não deve ter uma classe de estado ativo quando estaAberto for false', () => {
    const modal = shallow(
      <Modal estaAberto={false} fechaModal={() => {}}>
        <h1>Título do modal</h1>
      </Modal>
    );

    const modalOverlay = modal.find('.modal');

    expect(modalOverlay.hasClass('modal--active')).toBeFalsy();
  });

  it('não deve acionar fechaModal quando .modal__wrapper for clicado', () => {
    const mockFechaModal = jest.fn();
    const modal = shallow(
      <Modal estaAberto={true} fechaModal={mockFechaModal}>
        <h1>Título do modal</h1>
      </Modal>
    );

    const mockEvent = {
      target: {
        closest: () => true
      }
    };

    modal.simulate('click', mockEvent);
    expect(mockFechaModal.mock.calls.length).toBe(0);
  });

  it('deve acionar fechaModal quando .modal for clicado', () => {
    const mockFechaModal = jest.fn();
    const modal = shallow(
      <Modal estaAberto={true} fechaModal={mockFechaModal}>
        <h1>Título do modal</h1>
      </Modal>
    );

    const mockEvent = {
      target: {
        closest: () => false
      }
    };

    modal.simulate('click', mockEvent);
    // expect(mockFechaModal.mock.calls.length).toBe(1);
    expect(mockFechaModal).toHaveBeenCalled();
  });
});
