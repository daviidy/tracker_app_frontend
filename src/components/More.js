import { useState } from 'react';
import { Redirect } from 'react-router-dom';

const More = () => {
  const [redirect, setRedirect] = useState(false);

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setRedirect(true);
  };

  return (
    redirect
      ? <Redirect to="/users/sign_in" />
      : (
        <>
          <div className="col-12 shadow p-3 mb-5 bg-white rounded">
            <a href="/measures" className="font-weight-bold">
              List of habits
            </a>
          </div>
          <div className="col-12 shadow p-3 mb-5 bg-white rounded">
            <a href="/habits/create" className="font-weight-bold">
              Create a habit
            </a>
          </div>
          <div className="col-12 shadow p-3 mb-5 bg-white rounded">
            <a href="https://tracker-back-mcv.herokuapp.com/api/docs" target="__blank" className="font-weight-bold">
              API documentation
            </a>
          </div>
          <div className="col-12 shadow p-3 mb-5 bg-white rounded">
            <button className="font-weight-bold text-danger" type="button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </>
      )
  );
};

export default More;
