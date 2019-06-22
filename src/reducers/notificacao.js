function reducerNotificacao (state = '', action) {
  switch (action.type) {
    case 'MOSTRAR_NOTIFICACAO':
      return action.payload;

    case 'REMOVE_NOTIFICACAO':
      return '';      

    default:
      return state;
  }
}

export default reducerNotificacao;