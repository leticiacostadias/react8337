import React, { Fragment, PureComponent } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Cabecalho from './../components/Cabecalho';
import Widget from './../components/Widget';

class SignUp extends PureComponent {
  handleSubmit = (values) => {
    console.log(values);
  }

  render() {
    return (
      <Fragment>
        <Cabecalho />
        <div className="container">
          <Widget>
            <h3>Sign up!</h3>
            
            <Formik
              initialValues={{
                nome: '',
                email: '',
                password: '',
                tag: '',
                phone: '+55'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('E-mail inválido')
                  .required('Campo obrigatório'),
                name: Yup.string()
                  .required('Campo obrigatório')
              })}
              onSubmit={this.handleSubmit}
              render={(props) => (
                <Form>
                  <Field type="text" placeholder="Nome" name="nome"/>
                  <ErrorMessage name="nome" />

                  <Field type="email" placeholder="E-mail" name="email"/>
                  <ErrorMessage name="email"/>

                  <Field type="password" placeholder="Senha" name="password"/>
                  <Field type="text" placeholder="Tag" name="tag"/>
                  <Field type="text" placeholder="Telefone" name="phone"/>

                  <button type="submit">Criar conta</button>
                </Form>
              )}
            />
          </Widget>
        </div>
      </Fragment>
    );
  }
}

export default SignUp;