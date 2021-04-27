const More = () => (
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
  </>
);

export default More;
