export function mostraNotificacao(conteudo) {
  return (dispatch) => {
    dispatch({
      type: 'MOSTRAR_NOTIFICACAO',
      payload: conteudo
    });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICACAO' });
    }, 5000);
  }
}