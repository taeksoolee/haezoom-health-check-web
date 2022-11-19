class AllCheckButton extends StateElement {
  constructor() {
    super({
      state: {

      },
      styleSheet: `
        
      `
    });
  }

  _handleClick() {
    const $items = document.querySelectorAll('health-check-item');
    $items.forEach($item => $item.click());
  }

  render() {
    const id = window.uuidGenerator.get('allCheckBtn');

    return {
      html: `<custom-button ${id}> All Site Check </custom-button>`,
      handlers: {
        [id]: {
          click: this._handleClick,
        }
      }
    }
  }
}


customElements.define('all-check-button', AllCheckButton);