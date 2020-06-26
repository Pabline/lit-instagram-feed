import { html, css, LitElement } from 'lit-element';

export class LitInstagramFeed extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--lit-instagram-feed-text-color, #000);
      }

      .container {
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      .posts-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
      }

      .post {
        margin: 5px 5px;
        cursor: pointer;
      }

      .title {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .subtitle {
        margin: 10px;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
      token: { type: String},
      feed: { type: Array},
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if(this.token) {
      this.getUserFeed();
    }
  }

  async getUserFeed () {
    const url = new URL('https://api.instagram.com/v1/users/self/media/recent');
    const params = {access_token: this.token};
    url.search = new URLSearchParams(params).toString();

    fetch(url).then((response) => {
      if (response.status === 200) {
        return response.json();
      }

      throw Error(response.statusText);

    }).then((json) => {
      this.feed = json.data.filter((post) => post.type !== 'video');
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    if(!this.token) {
      return html`
        <p id="error-token">You should provide a token property to get the feed.</p>
      `
    }

    if(this.feed) {
      return html`
      <div class="container">
        <span class="title">${this.title}</span>
        <span class="subtitle">${this.subtitle}</span>
        <div class="posts-container">
          ${this.feed.map(post => html`
            <div class="post">
              <a .href=${post.link} .aria-label=${post.caption.text} target="_blank" rel="noopener"><img .src=${post.images.thumbnail.url} alt=""></a>
            </div>
          `)}
        </div>
      </div>
    `;
    }

    return html `
      <p id="loading">Loading...</p>
    `;

  }
}
