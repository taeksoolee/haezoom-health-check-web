class CustomButton extends StatelessElement {
  constructor() {
    super({
      styleSheet: `
        .btn {
          min-width: 100px;
          text-align: center;

          background-color:#0a0a23;
          color: #fff;
          border:none; 

          border-radius:10px; 
          padding:15px;
        }

        .btn[disabled] {
          background-color: #aaaaaa;
        }
      `
    });
  }

  render() {
    return `<button ${this.rootAttrs} class="btn">${this.childrenHTML}</button>`
  }
}

customElements.define('custom-button', CustomButton);