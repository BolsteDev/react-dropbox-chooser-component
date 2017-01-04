import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import DropboxChooser from './DropboxChooser';

describe('<DropboxChooser />', () => {
  it('mounts', () => {
    const wrapper = mount(
      <DropboxChooser />
    );

    expect(wrapper.find('.dropbox-chooser')).to.be.length(1);
  });

  it('calls create script', () => {
    const createScript = DropboxChooser.prototype.createScript;
    DropboxChooser.prototype.createScript = sinon.spy();

    mount(
      <DropboxChooser appKey="test" />
    );

    expect(DropboxChooser.prototype.createScript).to.have.been.calledOnce;
    expect(DropboxChooser.prototype.createScript).to.have.been.calledWith('test');

    // Reset
    DropboxChooser.prototype.createScript = createScript;
  });
});
