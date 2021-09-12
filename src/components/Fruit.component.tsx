import { ChangeEvent, useEffect, useState } from "react";
import IFruitData from "../types/fruit.type";
import FruitDataService from "../services/fruit.service";

type Props = {
  fruit: IFruitData;
  refreshList: Function;
};

type FruitState = {
  currentFruit: IFruitData;
  message: string;
};

const Fruit = (props: Props) => {
  const blankFruit = {
    currentFruit: { key: null, fruitName: "", fruitColor: "", fruitShape: "" },
    message: "",
  };

  const [fruitState, setFruitState] = useState<FruitState>(blankFruit);

  useEffect(() => {
    setFruitState({
      currentFruit: props.fruit,
      message: "",
    });
  }, [props.fruit]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedFruit = {
      ...fruitState.currentFruit,
      [e.target.name]: e.target.value,
    };
    setFruitState({ ...fruitState, currentFruit: updatedFruit });
  };

  const updateFruit = () => {
    if (fruitState.currentFruit.key) {
      const data = {
        fruitName: fruitState.currentFruit.fruitName,
        fruitColor: fruitState.currentFruit.fruitColor,
        fruitShape: fruitState.currentFruit.fruitShape,
      };
      FruitDataService.update(fruitState.currentFruit.key, data)
        .then(() => {
          setFruitState({
            ...fruitState,
            message: "The fruit was updated successfully.",
          });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  const deleteFruit = () => {
    if (fruitState.currentFruit.key) {
      FruitDataService.delete(fruitState.currentFruit.key)
        .then(props.refreshList())
        .catch((e: Error) => console.log(e));
    }
  };

  return (
    <div>
      <h2>Current Fruit:</h2>
      <h2>{fruitState.currentFruit.fruitName.toUpperCase()}</h2>
      
    </div>
  );
};

export default Fruit;
