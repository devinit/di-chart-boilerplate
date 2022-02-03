import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const Legend = ({ data, position }) => {
  return (
    <div className={classNames("custom-legend", { right: position === 'right' })}>
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
  position: PropTypes.string,
}

Legend.defaultProps = { data: [] };

export default Legend;
