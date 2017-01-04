# react-dropbox-chooser

[![CircleCI](https://circleci.com/gh/BolsteDev/react-dropbox-chooser.svg?style=svg)](https://circleci.com/gh/BolsteDev/react-dropbox-chooser) [![npm version](https://badge.fury.io/js/react-dropbox-chooser.svg)](https://badge.fury.io/js/react-dropbox-chooser)

A simple dropbox chooser component for react.

## Installing

```
yarn add react-dropbox-chooser
```

## Usage

```js
import DropboxChooser from 'react-dropbox-chooser';

// ...
  <Chooser
    appKey="YOUR_DROPBOX_API_KEY_HERE" // Optional, You do NOT need to provide a key when mounting. Once a key is set, then the component will mount Dropbox
    className="dropbox_custom_class" // Optional
    extensions={['.jpg']} // Optional
    linkType="direct" // Optional, or "preview", defaults to "preview"
    multiselect // Optional, defaults false
    onCancel={() => {}} // Optional, default noop
    onSuccess={(fs) => { console.log(fs); } // Optional, default noop
  />
// ...
```
