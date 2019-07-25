import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash-es';

import { FieldGroup, CheckboxField, TextLink } from '@contentful/forma-36-react-components';

export default class NetlifyContentTypes extends Component {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    contentTypes: PropTypes.array.isRequired,
    enabledContentTypes: PropTypes.array.isRequired,
    onEnabledContentTypesChange: PropTypes.func.isRequired
  };

  onSelectAll = () => {
    this.props.onEnabledContentTypesChange(this.props.contentTypes.map(([id]) => id));
  };

  onChange = (checked, id) => {
    const enabled = this.props.enabledContentTypes;
    this.props.onEnabledContentTypesChange(
      checked ? uniq(enabled.concat([id])) : enabled.filter(cur => cur !== id)
    );
  };

  render() {
    const { disabled, contentTypes, enabledContentTypes } = this.props;

    return (
      <>
        <TextLink disabled={disabled} onClick={this.onSelectAll}>
          Select all
        </TextLink>
        <FieldGroup>
          {contentTypes.map(([id, name]) => (
            <CheckboxField
              key={id}
              id={`ct-box-${id}`}
              labelText={name}
              onChange={e => this.onChange(e.target.checked, id)}
              disabled={disabled}
              checked={enabledContentTypes.includes(id)}
            />
          ))}
        </FieldGroup>
      </>
    );
  }
}
