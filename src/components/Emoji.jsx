import React from 'react';
import PropTypes from 'prop-types';
import nodeEmoji from 'node-emoji';

const Emoji = ({ name }) => <span>{nodeEmoji.get(name)}</span>;
export default Emoji;

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
};
