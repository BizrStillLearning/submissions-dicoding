import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <section className="not-found-page">
            <h2>404 - Halaman Tidak Ditemukan</h2>
            <p>Ups! Alamat URL yang Anda tuju tidak ada dalam aplikasi.</p>
            <Link to="/" style={{ textDecoration: 'underline', color: 'white', marginTop: '20px', display: 'inline-block' }}>
                Kembali ke Halaman Utama
            </Link>
        </section>
    );
}

export default NotFoundPage;