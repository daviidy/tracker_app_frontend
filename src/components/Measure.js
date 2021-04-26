import PropTypes from 'prop-types';

const Measure = ({ measure }) => (

  <p>
    {measure.value}
  </p>
);

export default Measure;

Measure.propTypes = {
  measure: PropTypes.shape({
    value: PropTypes.number,
  }).isRequired,
};
