import Routes from '../Routes';

const Navbar = () => (
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/habits">Habits</a>
    </li>
    <li>
      <a href="/habits/create">Add habit</a>
    </li>
    <li>
      <a href="/users/sign_up">Sign Up</a>
    </li>
    <li>
      <a href="/users/sign_in">Sign In</a>
    </li>
    <Routes />
  </ul>

);

export default Navbar;
