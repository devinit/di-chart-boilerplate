import React from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

const OdaAidTable = (props) => {
  console.log(props);

  return (
    <Table>
      <thead>
        <tr><td>ODA Table Goes Here</td></tr>
      </thead>
    </Table>
  );
};

OdaAidTable.propTypes = {
  country: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.array),
};

export { OdaAidTable };
