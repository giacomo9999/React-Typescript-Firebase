import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <div className="nav-item-group">
          <li>
            <Link to="/fruits">
              <h3>Fruits Of The World</h3>
            </Link>
          </li>
        </div>
        <div className="nav-item-group">
          <li>
            <Link to="/fruits">
              <h5>List of Fruits</h5>
            </Link>
          </li>
          <li>
            <Link to="/add">
              <h5>Add New Fruit</h5>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
