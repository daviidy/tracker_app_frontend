import Routes from '../Routes';
import title from '../modules/title';

const Navbar = () => {
  const { pathname } = window.location;
  return (
    <>
      <div className="container-fluid main-title bg-blue-color p-3 text-center text-white font-weight-bold">
        { title(pathname) }
      </div>
      <div className="content container">
        <Routes />
      </div>
      <div className="container-fluid bg-dark main-nav">
        <div className="row">
          <ul className="pl-0 pr-0 col-12 d-flex justify-content-around">
            <li className={`text-center menu-item ${pathname === '/' ? 'bg-blue-color' : ''}`}>
              <i className="fas fa-plus" />
              <a href="/">Add measure</a>
            </li>
            <li className={`text-center menu-item ${pathname === '/measures' ? 'bg-blue-color' : ''}`}>
              <i className="fas fa-chart-line" />
              <a href="/measures">Track it</a>
            </li>
            <li className={`text-center menu-item ${pathname === '/progress' ? 'bg-blue-color' : ''}`}>
              <i className="fas fa-chart-pie" />
              <a href="/progress">Your progress</a>
            </li>
            <li className={`text-center menu-item ${pathname === '/more' ? 'bg-blue-color' : ''}`}>
              <i className="fas fa-ellipsis-h" />
              <a href="/more">More</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
