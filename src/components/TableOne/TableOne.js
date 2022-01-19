import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table';

const TableOne = (props) => {
  return <Table>{props.country} Table Goes Here</Table>;
};

TableOne.propTypes = {
  country: PropTypes.string,
};

export { TableOne };
