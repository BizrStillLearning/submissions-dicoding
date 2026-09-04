class AppBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.title = this.getAttribute('app-title') || 'Notes App';
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background-color: #2c3e50;
          color: white;
          text-align: center;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 2rem;
        }
      </style>
      <h1>${this.title}</h1>
    `;
    }
}

customElements.define('app-bar', AppBar);