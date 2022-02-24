import React from 'react';
import './Login.css';
import Form from '../Form/Form';
import FormTop from '../FormTop/FormTop';
import FormBottom from '../FormBottom/FormBottom';
import FormButton from '../FormButton/FormButton';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [errorEmail, setErrorEmail] = React.useState('');
  const [errorPassword, setErrorRassword] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);

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
    props.onAuthorization(email, password);
  };

  React.useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <section className="register">
      <FormTop title="Рады видеть!" />
      <form className="form" onSubmit={handleSubmit} noValidate>
        <Form type="email" name="email" id="email-input" placeholder="E-mail" value={email} error={errorEmail} isValid={isValid} patter="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" onChange={handleChangeEmail} />
        <Form type="password" name="password" id="password-input" placeholder="Пароль" minLength="6" value={password} error={errorPassword} isValid={isValid} onChange={handleChangePassword} />
        <FormButton title="Войти" type="form__submit-button_type_login" isValid={isValid} />
      </form>
      <FormBottom text="Еще не зарегистрированы?" link="/signup" linkText="Регистрация"/>
    </section>
  );
};

export default Register;