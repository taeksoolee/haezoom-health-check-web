
class StatelessElement extends HTMLElement {
  constructor(config) {
    super();
    this.attachShadow({
      mode: 'open',
    });

    this._styleSheet = document.createElement('style');
    this._styleSheet.textContent = config?.styleSheet ?? '';
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

  _render() {
    const html = this.render();
    this.shadowRoot.innerHTML = `${html}${this._styleSheet.outerHTML}`;
  }

  get rootAttrs() {
    let attrs = [];
    const props = this.props;
    for(const name in props) {
      attrs.push(`${name}="${props[name]}"`);
    }

    return attrs.join(' ');
  }
}