import PropTypes from 'prop-types';
import React from 'react';

const Table = (props) => <div className="table-styled">{props.children}</div>;

Table.propTypes = { children: PropTypes.children };

export default Table;
