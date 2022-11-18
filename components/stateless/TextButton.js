class TextButton extends StatelessElement {
  constructor() {
    super({
      styleSheet: `
        .btn {
          border: none;
          background-color: none;
          outline: none;
        }

        .btn[disabled] {
          
        }
      `
    });
  }

  render() {
    return `<button ${this.rootAttrs} class="btn">${this.childrenHTML}</button>`
  }
}

customElements.define('text-button', TextButton);