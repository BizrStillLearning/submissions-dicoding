import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';

function AddPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const onTitleChangeEventHandler = (event) => {
        setTitle(event.target.value);
    };

    const onBodyInputEventHandler = (event) => {
        setBody(event.target.innerHTML);
    };

    const onSubmitEventHandler = async (event) => {
        event.preventDefault();
        await addNote({ title, body });
        navigate('/');
    };

    return (
        <section className="add-new-page">
            <form className="add-new-page__input" onSubmit={onSubmitEventHandler}>
                <input
                    className="add-new-page__input__title"
                    placeholder="Catatan rahasia"
                    value={title}
                    onChange={onTitleChangeEventHandler}
                    required
                />
                <div
                    className="add-new-page__input__body"
                    data-placeholder="Sebenarnya saya adalah ...."
                    contentEditable
                    onInput={onBodyInputEventHandler}
                />
                <div className="add-new-page__action">
                    <button className="action" type="submit" title="Simpan">
                        ✓
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AddPage;