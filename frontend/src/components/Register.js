import React from 'react';
import SignForm from './SignForm';

function Register({ changeHeaderMenuData, onHandleRegister }) {

  React.useEffect(() => {
    changeHeaderMenuData({link: '/sign-in', name: 'Войти'});
  }, [])

  return(
    <div className="sign">

      <SignForm
        submitButtonName="Зарегистрироваться"
        onSubmit={onHandleRegister}
        action='register'
        title="Регистрация"
      />

    </div>
  )
}

export default Register;
