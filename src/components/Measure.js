import PropTypes from 'prop-types';

const Measure = ({ measure, habitId, handleDelete }) => {
  const handleClick = (e) => {
    handleDelete(e, habitId, measure.id);
  };

  return (
    <div className="row">
      <div className="col-8">
        <p className="font-weight-bold date">{measure.date}</p>
        <p>{measure.value}</p>
      </div>
      <div className="col-4 d-flex justify-content-end">
        <button type="button">
          <a className="mr-3" href={`/habits/${habitId}/measurements/${measure.id}`}>
            <i className="fas fa-pencil-alt" />
          </a>
        </button>
        <button type="button" onClick={handleClick}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default Measure;

Measure.propTypes = {
  measure: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
  habitId: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
