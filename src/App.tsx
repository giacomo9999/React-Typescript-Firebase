import { Switch, Route } from "react-router-dom";
import FruitsList from "./components/FruitsList.component";
import NavBar from "./components/Navbar";
import AddOrEditForm from "./components/AddOrEditForm";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Switch>
          <Route exact path={["/", "/fruits"]} component={FruitsList} />
          <Route
            exact
            path="/add"
            component={() => (
              <AddOrEditForm
                formType={"add"}
                fruit={{
                  key: null,
                  fruitName: "",
                  fruitColor: "",
                  fruitShape: "",
                }}
                refreshList={() => {}}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
