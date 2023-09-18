import React, { useEffect } from 'react';
import RegisterForm from '../../components/core/home/register';

const Register = () => {
    useEffect(() => {
        document.title = "CSDL ATTP | Đăng ký";
    }, []);

    return <RegisterForm />
}

export default Register;