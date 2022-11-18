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
    this.setState({
      loading: true,
    });
    
    const s = Date.now();
    let e;
    let result = true;
    try {
      await fetch(this.props.url, {
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain'
        }
      });

      e = Date.now()
    } catch(e) {
      result = false;
      e = Date.now()
    } finally {
      this.setState({
        loading: false,
        returnTime: e -s,
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

    const checkButton = !this.state.loading 
      ? `<custom-button ${checkButtonId}>Check</custom-button>`
      : '<custom-button disabled>loading...</custom-button>';
    const resultSpan = this.state.result !== null 
      ? `<span>${this.state.result ? '정상' : '비정상'}(${this.state.returnTime}ms)</span>`
      : '';

    console.log(this.props);

    return {
      html: `
        <div class="container">
          <div class="flex">
            <label>
              <a href="${this.props.url}" target="_blank">Site</a>&nbsp;&nbsp;&nbsp;
              ${this.props.label ?? ''}
              <text-button ${toggleButtonId}>${this.state.toggleFlag ? '▼': '►'}</text-button>
            </label>

            <div class="result-box">
              ${resultSpan}
            </div>

            ${checkButton}
          </div>
          ${this.state.toggleFlag && this.props.sites ? `
          <div class="sites-container">
            ${this.props.sites.split(',').map(url => `
              <div>
                &nbsp;&nbsp;&nbsp;<a href="${url}" target="_blank">${url}</a>
              </div>
            `).join('')}
          </div>
          ` : ''}
          
          ${this.childrenHTML}
        </div>
      `,
      options: {
        [checkButtonId]: {
          handlers: {
            click: this._testUrl
          }
        },
        [toggleButtonId]: {
          handlers: {
            click: () => {
              this.setState({
                toggleFlag: !this.state.toggleFlag,
              })
            }
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