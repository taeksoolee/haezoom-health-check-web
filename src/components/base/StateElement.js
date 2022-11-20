class StateElement extends HTMLElement {
  /**
   * 할일
   * @typedef {Object} Config
   * @property {any} state - 할일 id
   * @property {string} styleSheet - 할일 내용
   */

  /**
   * 
   * @param {Config} config
   */
  constructor(config) {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this._state = config?.state;

    this._styleSheet = document.createElement('style');
    this._styleSheet.textContent = config?.styleSheet ?? '';
  };

  get state() {
    return this._state;
  }

  setState(state) {
    if (typeof state === 'function') {
      this._state = state(this._state);
    } else {
      this._state = {
        ...this._state,
        ...state
      };
    }
    this._render();
  }

  connectedCallback() {
    this.childrenHTML =  this.innerHTML;
    const attrNames = this.getAttributeNames();
    this.props = {};
    for(const name of attrNames) {
      this.props[name] = this.getAttribute(name);
    }

    this._render();
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.log("attributeChangedCallback", name, oldValue || "null", newValue);
  // }

  _render() {
    if (!this.render) {
      return;
    }

    const {
      html, handlers
    } = this.render();
    this.shadowRoot.innerHTML = `${html}${this._styleSheet.outerHTML}`;

    for(const id in handlers) {
      const el = this.shadowRoot.querySelector(`[${id}]`);

      if(!el) continue;

      const handler = handlers[id];
      if(handler) {
        for(const event in handler) {
          el.addEventListener(`${event}`, handler[event].bind(this));
        }
      }
    }
  }

  /**
   * @typedef {Object} Handlers
   */

  /**
   * @typedef {Object} RenderItem
   * @property {string} html
   * @property {Handlers} handlers
   */

  /**
   * @abstract
   * @return {RenderItem}
   */
  redner() {
    return {

    }
  }
}