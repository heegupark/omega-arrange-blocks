import React, { Component } from 'react';
import Stack from './stack';

export default class Index extends Component {
  render() {
    return (
      <Stack
        items={'Lorem ipsum dolor sit'.split(' ')}
      />
    );
  }
}
