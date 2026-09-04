class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set note(value) {
        this._note = value;
        this.render();
    }

    render() {
        const date = new Date(this._note.createdAt).toLocaleDateString('id-ID', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });

        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .card {
          background-color: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }
        .date {
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-bottom: 1rem;
        }
        .body {
          color: #34495e;
          line-height: 1.5;
          flex-grow: 1;
        }
      </style>
      <div class="card">
        <h3>${this._note.title}</h3>
        <div class="date">${date}</div>
        <div class="body">${this._note.body}</div>
      </div>
    `;
    }
}

customElements.define('note-item', NoteItem);