import React from 'react';
import PropTypes from 'prop-types';

const Legend = ({ data }) => {
  return (
    <div className="custom-legend">
      {data.map((d) => (
        <div className="legend-item" key={d.caption}>
          <span className="badge" style={{backgroundColor: d.colour }}/>
          <span className="text">{d.caption}</span>
        </div>
      ))}
    </div>
  );
};

Legend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func,
}

Legend.defaultProps = { data: [] };

export default Legend;
