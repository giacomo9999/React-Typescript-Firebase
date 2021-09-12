import { ChangeEvent, useEffect, useState } from "react";
import IFruitData from "../types/fruit.type";

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
    currentFruit: { fruitName: "", fruitColor: "", fruitShape: "" },
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

  return (
    <div>
      <h2>Current Fruit:</h2>
      <h2>{fruitState.currentFruit.fruitName.toUpperCase()}</h2>
    </div>
  );
};

export default Fruit;
