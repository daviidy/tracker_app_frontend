import PropTypes from 'prop-types';

const Habit = ({ habit }) => (

  <p>
    {habit.name}
  </p>
);

export default Habit;

Habit.propTypes = {
  habit: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
