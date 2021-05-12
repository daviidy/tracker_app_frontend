import {
  render, screen,
} from '@testing-library/react';
import Habit from '../Habit';

describe('Habit', () => {
  test('renders Habit component', () => {
    const mockHabit = {
      name: 'any',
    };

    render(<Habit habit={mockHabit} />);

    screen.debug();
  });
});
