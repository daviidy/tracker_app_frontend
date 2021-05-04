import {
  render, screen,
} from '@testing-library/react';
import Measure from '../Measure';

describe('Measure', () => {
  test('renders Measure component', () => {
    const mockMeasure = {
      id: 1,
      value: 2,
      date: '12-11-2020',
    };

    const habitId = '1';
    const handleDelete = () => 'any';

    render(<Measure
      measure={mockMeasure}
      habitId={habitId}
      handleDelete={handleDelete}
    />);

    screen.debug();
  });
});
