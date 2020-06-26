```js script
import { html } from '@open-wc/demoing-storybook';
import '../lit-instagram-feed.js';

export default {
  title: 'LitInstagramFeed',
  component: 'lit-instagram-feed',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# Lit Instagram Feed

A component for show a simple feed of your instagram profile.

## Features:

- Show just the instagram feed with link to any post
- Can set title and subtitle

## How to use

### Installation

```bash
yarn add lit-instagram-feed
or
npm i lit-instagram-feed
```

You have to get your instagram acces_token here: [Instagram Developer](https://www.instagram.com/developer/authentication/).

Here is a [guide](https://docs.oceanwp.org/article/487-how-to-get-instagram-access-token).

```js
import 'lit-instagram-feed/lit-instagram-feed.js';
```

```js preview-story
export const Simple = () => html`
  <lit-instagram-feed token="14941820587.1677ed0.8eb8227cb57446f5a8925f30a9c64b6f"></lit-instagram-feed>
`;
```

## Variations

###### With Title and Subtitle

```js preview-story
export const WithTitleAndSubtitle = () => html`
  <lit-instagram-feed token="14941820587.1677ed0.8eb8227cb57446f5a8925f30a9c64b6f" title="Instagram Feed" subtitle="This is a subtitle"></lit-instagram-feed>
`;
```
