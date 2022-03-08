import React from 'react';
import './Register.css';
import Form from '../Form/Form';
import FormTop from '../FormTop/FormTop';
import FormBottom from '../FormBottom/FormBottom';
import FormButton from '../FormButton/FormButton';

function Register(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorName, setErrorName] = React.useState('');
  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorRassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

  function handleChangeName(evt) {
    setName(evt.target.value);
    setErrorName(evt.target.validationMessage);
    setIsValid(evt.target.closest(".form").checkValidity());
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
    setErrorEmail(evt.target.validationMessage);
    setIsValid(evt.target.closest(".form").checkValidity());
  };

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
    setErrorRassword(evt.target.validationMessage);
    setIsValid(evt.target.closest(".form").checkValidity());
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegistration(name, email, password);
  };

  return (
    <section className="register">
      <FormTop title="Добро пожаловать!" />
      <form className="form" onSubmit={handleSubmit}>
        <Form type="text" name="name" id="name-input" placeholder="Имя" minLength="2" maxLength="30" value={name || ''} error={errorName} isValid={isValid} onChange={handleChangeName} />
        <Form type="email" name="email" id="email-input" placeholder="E-mail" value={email} error={errorEmail} isValid={isValid} patter="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onChange={handleChangeEmail} />
        <Form type="password" name="password" id="password-input" placeholder="Пароль" minLength="6" value={password} error={errorPassword} isValid={isValid} onChange={handleChangePassword} />
        <FormButton title="Зарегистрироваться" type="form__submit-button_type_register" isValid={isValid} />
      </form>
      <FormBottom text="Уже зарегистрированы?" link="/signin" linkText="Войти" />
    </section>
  );
};

export default Register;