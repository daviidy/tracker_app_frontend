import Routes from '../Routes';

const Navbar = () => (
  <ul>
    <li>
      <a href="/habits">Habits</a>
    </li>
    <li>
      <a href="/habits/create">Add habit</a>
    </li>
    <Routes />
  </ul>

);

export default Navbar;
