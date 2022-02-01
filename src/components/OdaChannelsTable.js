import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

const OdaChannelsTable = (props) => {
  console.log(props);

  return (
    <Table>
      <thead>
        <tr><td>ODA Channels Table Goes Here</td></tr>
      </thead>
    </Table>
  );
};

OdaChannelsTable.propTypes = {
  country: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.array),
};

export default OdaChannelsTable;
