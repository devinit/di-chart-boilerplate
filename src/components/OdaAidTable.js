import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

const OdaAidTable = (props) => {
  console.log(props);

  return (
    <Table>
      <thead>
        <tr>ODA Table Goes Here</tr>
      </thead>
    </Table>
  );
};

OdaAidTable.propTypes = {
  country: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.array),
};

export { OdaAidTable };
