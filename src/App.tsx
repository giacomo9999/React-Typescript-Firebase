import { Switch, Route, Link } from "react-router-dom";
import FruitsList from "./components/FruitsList.component";
import AddFruit from "./components/AddFruit.component";

import NavBar from "./components/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Switch>
          <Route exact path={["/", "/fruits"]} component={FruitsList} />
          <Route exact path="/add" component={AddFruit} />Î
        </Switch>
      </div>
    </div>
  );
}

export default App;
