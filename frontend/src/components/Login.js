import React from 'react';
import SignForm from './SignForm';

function Login({ changeHeaderMenuData, onHandleAuthorize }) {

  React.useEffect(() => {
    changeHeaderMenuData({link: '/sign-up', name: 'Регистрация'});
  }, [])

  return(
    <div className="sign">

      <SignForm
        submitButtonName="Войти"
        onSubmit={onHandleAuthorize}
        action='authorize'
        title="Вход"
      />

    </div>
  )
}

export default Login;
