import PropTypes from 'prop-types';

const Measure = ({ measure, habitId, handleDelete }) => {
  const handleClick = (e) => {
    handleDelete(e, habitId, measure.id);
  };

  return (
    <>
      <p>
        {measure.value}
      </p>
      <a href={`/habits/${habitId}/measurements/${measure.id}`}>
        Update
      </a>
      <br />
      <button type="button" onClick={handleClick}>Delete</button>
    </>
  );
};

export default Measure;

Measure.propTypes = {
  measure: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
  }).isRequired,
  habitId: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
