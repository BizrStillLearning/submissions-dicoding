import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data.js';

function RegisterPage() {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const { error } = await register({ name, email, password });

        if (!error) {
            alert('Registrasi berhasil! Silakan login.');
            navigate('/');
        }
    };

    return (
        <section className="register-page">
            <h2>Isi form untuk mendaftar akun.</h2>
            <form onSubmit={onSubmitHandler} className="input-register">
                <label htmlFor="name">Nama</label>
                <input type="text" id="name" value={name} onChange={onNameChange} required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailChange} required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange} required />

                <button type="submit">Register</button>
            </form>
            <p>Sudah punya akun? <Link to="/">Login di sini</Link></p>
        </section>
    );
}

export default RegisterPage;