class NoteInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupForm();
    }

    setupForm() {
        const form = this.shadowRoot.querySelector('form');
        const titleInput = this.shadowRoot.querySelector('#title');
        const bodyInput = this.shadowRoot.querySelector('#body');
        const titleError = this.shadowRoot.querySelector('#title-error');
        const bodyError = this.shadowRoot.querySelector('#body-error');

        titleInput.addEventListener('input', () => {
            if (titleInput.value.trim().length < 3) {
                titleError.textContent = 'Judul minimal 3 karakter.';
                titleError.style.display = 'block';
            } else {
                titleError.style.display = 'none';
            }
        });

        bodyInput.addEventListener('input', () => {
            if (bodyInput.value.trim().length < 5) {
                bodyError.textContent = 'Isi catatan minimal 5 karakter.';
                bodyError.style.display = 'block';
            } else {
                bodyError.style.display = 'none';
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (titleInput.value.trim().length >= 3 && bodyInput.value.trim().length >= 5) {
                const newNote = {
                    id: `notes-${Math.random().toString(36).substr(2, 9)}`,
                    title: titleInput.value,
                    body: bodyInput.value,
                    createdAt: new Date().toISOString(),
                    archived: false,
                };

                this.dispatchEvent(new CustomEvent('note-added', {
                    detail: newNote,
                    bubbles: true
                }));

                form.reset();
            } else {
                alert('Pastikan semua form diisi dengan benar sebelum submit.');
            }
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        .form-container {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        input, textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: inherit;
          box-sizing: border-box;
          transition: border-color 0.3s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #3498db;
        }
        textarea {
          resize: vertical;
          min-height: 120px;
        }
        .error-message {
          color: #e74c3c;
          font-size: 0.85rem;
          margin-top: 0.4rem;
          display: none;
        }
        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
          width: 100%;
        }
        button:hover {
          background-color: #2980b9;
        }
      </style>
      
      <div class="form-container">
        <h2>Tambah Catatan Baru</h2>
        <form>
          <div class="form-group">
            <label for="title">Judul Catatan</label>
            <input type="text" id="title" placeholder="Masukkan judul..." required autocomplete="off">
            <span class="error-message" id="title-error"></span>
          </div>
          <div class="form-group">
            <label for="body">Isi Catatan</label>
            <textarea id="body" placeholder="Tuliskan catatanmu di sini..." required></textarea>
            <span class="error-message" id="body-error"></span>
          </div>
          <button type="submit">Tambah Catatan</button>
        </form>
      </div>
    `;
    }
}

customElements.define('note-input', NoteInput);