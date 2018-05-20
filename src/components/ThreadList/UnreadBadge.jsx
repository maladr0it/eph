import React from 'react';
import PropTypes from 'prop-types';

const UnreadBadge = ({ count }) => <div className="UnreadBadge">{count}</div>;

export default UnreadBadge;

UnreadBadge.propTypes = {
  count: PropTypes.number.isRequired,
};
