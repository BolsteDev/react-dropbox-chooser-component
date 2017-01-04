/* global Dropbox:0 */
import React, { Component, PropTypes } from 'react';

const { arrayOf, bool, func, oneOf, string } = PropTypes;

const WARNING = 'Cannot change the app key once the Dropbox script has been loaded';
const noop = () => {};

/**
 * Dropbox Chooser
 *
 * Add the script for Dropbox and add a Dropbox file picker
 *
 * @param {String} appKey - The Dropbox App key. Optional when mounting
 * @param {String} className - Optional. Additional classes
 * @param {Array<String>} extensions - Optional. Extensions to filter user's choices
 * @param {String} linkType - Optional. One of 'preview' or 'direct'
 * @param {boolean} multiselect - Optional. Allow users to pick multiple files
 * @param {func} onCancel - Optional. Called when the user cancels a selection
 * @param {func} onSuccess - Optional. Called when the user selects files
 */
export default class DropboxChooser extends Component {
  static propTypes = {
    appKey: string,
    className: string,
    extensions: arrayOf(string),
    linkType: oneOf(['preview', 'direct']),
    multiselect: bool,
    onCancel: func,
    onSuccess: func,
  }

  static defaultProps = {
    appKey: null,
    className: '',
    extensions: null,
    linkType: 'preview',
    multiselect: false,
    onSuccess: noop,
    onCancel: noop,
  }

  state = {
    isScriptLoaded: false,
  }

  constructor(props) {
    super(props);

    // We need to spy on the prototype
    this._createScript = this.createScript.bind(this);
  }

  componentWillMount() {
    const { appKey } = this.props;

    if (appKey) {
      this._createScript(appKey);
    }
  }

  componentWillReceiveProps(newProps) {
    const { appKey } = newProps;
    const { isScriptLoaded } = this.state;

    if (!isScriptLoaded && appKey && !this.props.appKey) {
      this._createScript(appKey);
    }

    if (isScriptLoaded && appKey && !this.props.appKey) {
      console.warn ? console.warn(WARNING) : console.log(WARNING); // eslint-disable-line no-console
    }
  }

  createScript(appKey) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
    script.id = 'dropboxjs';
    script.setAttribute('data-app-key', appKey);
    script.onload = () => {
      this.setState({
        isScriptLoaded: true,
      }, () => {
        this.attach();
      });
    };

    document.body.appendChild(script);
  }

  attach = () => {
    const {
      extensions,
      linkType,
      multiselect,
      onCancel,
      onSuccess,
    } = this.props;

    const options = {
      success: onSuccess,
      cancel: onCancel,
      linkType,
      multiselect,
    };

    // Completely optional with no default provided
    if (extensions) {
      options.extensions = extensions;
    }

    const button = Dropbox.createChooseButton(options);
    this.chooser.appendChild(button);
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={`dropbox-chooser ${className}`}
        ref={(ref) => { this.chooser = ref; }}
      />
    );
  }
}
