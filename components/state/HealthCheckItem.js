class HealthCheckItem extends StateElement {
  constructor() {
    super({
      state: {
        loading: false,
        result: null,
        returnTime: 0,
        toggleFlag: false,
      },
      styleSheet: `
        .container {
          border-top: 1px solid #aaaaaa;
          border-bottom: 1px solid #aaaaaa;
          margin-bottom: 10px;
        }

        .flex {
          display: flex;
          # justify-content: center;
          align-items: center;
          height: 50px;
        }

        label {
          display: block;
          width: 200px;
          line-height: 10px;
        }

        .result-box {
          text-align: center;
          flex: 1;
        }

        .sites-container {
          margin-top: 5px;
          margin-bottom: 5px;
        }
      `
    });
  };

  async _testUrl() {
    if(!this.props.url || this.props.url === 'undefined') {
      return;
    }

    this.setState({
      loading: true,
    });

    window.logger.startDuration('fetch url');
    let result = true;
    try {
      await fetch(this.props.url, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    } catch(e) {
      result = false;
    } finally {
      this.setState({
        loading: false,
        returnTime: window.logger.endDuration('fetch url'),
        result,
      });
    }
  }

  render() {
    // ({
    //   state: this.state,
    //   props: this.props,
    //   children: this.childrenHTML,
    // });

    const checkButtonId = uuidGenerator.get('check-button');
    const toggleButtonId = uuidGenerator.get('toggle-button');

    const CheckButton = this.props.url ? 
      !this.state.loading 
        ? `<custom-button ${checkButtonId}>Check</custom-button>`
        : '<custom-button disabled>loading...</custom-button>'
      : '';


    const ToggleButton = this.props.sites
      // ?`<text-button ${toggleButtonId}>${this.state.toggleFlag ? '▼': '►'}</text-button>`
      ?`<text-button ${toggleButtonId}>${this.state.toggleFlag ? 'Close': 'Detail'}</text-button>`
      : '';
    
    const ResultSpan = this.state.result !== null 
      ? `<span>${this.state.result ? '정상' : '비정상'}(${this.state.returnTime}ms)</span>`
      : '';

    const SiteAnchor = this.props.url ? `<a href="${this.props.url}" target="_blank">Site</a>` : '';

    const List = this.state.toggleFlag && this.props.sites ? `
      <div class="sites-container">
        ${this.props.sites.split(',').map(url => `
          <div>
            &nbsp;&nbsp;&nbsp;<a href="${url}" target="_blank">${url}</a>
          </div>
        `).join('')}
      </div>
    ` : '';

    return {
      html: `
        <div class="container">
          <div class="flex">
            <label>
              ${SiteAnchor}&nbsp;&nbsp;&nbsp;
              ${this.props.label ?? ''}
              ${ToggleButton}
            </label>

            <div class="result-box">
              ${ResultSpan}
            </div>

            ${CheckButton}
          </div>
          ${List}
          ${this.childrenHTML}
        </div>
      `,
      handlers: {
        [checkButtonId]: {
          click: this._testUrl
        },
        [toggleButtonId]: {
          click: () => {
            this.setState({
              toggleFlag: !this.state.toggleFlag,
            })
          }
        }
      }
    };
  }

  click() {
    this._testUrl();
  }
}

customElements.define('health-check-item', HealthCheckItem);