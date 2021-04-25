import PropTypes from 'prop-types';

const SingleHabit = (props) => {
  const {
    match: { params },
  } = props;

  const { id } = params;
  console.log(id);

  return (
    <p>
      <strong>Single Habit Component</strong>
    </p>
  );
};

export default SingleHabit;

SingleHabit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
