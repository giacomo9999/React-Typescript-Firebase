import { useEffect, useCallback, useState } from "react";
import FruitDataService from "../services/fruit.service";
import Fruit from "./Fruit.component";
import IFruitData from "../types/fruit.type";

type FruitsListState = {
  fruits: Array<IFruitData>;
  currentFruit: IFruitData | null;
  currentIndex: number;
};

const emptyFruitsList: FruitsListState = {
  fruits: [],
  currentFruit: null,
  currentIndex: -1,
};

const FruitsList = () => {
  const [fruitsListState, setFruitsListState] = useState(emptyFruitsList);
  const { fruits, currentFruit, currentIndex } = fruitsListState;

  const handleOnDataChange = useCallback((items: any) => {
    console.log("Creating fruits array...");
    let fruits = new Array<IFruitData>();
    items.forEach((item: any) => {
      let key = item.key;
      let data = item.val();
      fruits.push({
        key: key,
        fruitName: data.fruitName,
        fruitColor: data.fruitColor,
        fruitShape: data.fruitShape,
      });
    });
    setFruitsListState({ ...fruitsListState, fruits: fruits });
  }, []);

  useEffect(() => {
    console.log("Mounting fruits list...");
    FruitDataService.getAll().on("value", handleOnDataChange);
    return () => {
      console.log("Unmounting fruits list...");
      FruitDataService.getAll().off("value", handleOnDataChange);
    };
  }, [handleOnDataChange]);

  // const eventEmitter = new EventEmitter()
  // eventEmitter.on("start", () => {
  //   console.log("started");
  // });
  // eventEmitter.emit('start')
  // => started

  const refreshList = () => {
    setFruitsListState({
      ...fruitsListState,
      currentFruit: null,
      currentIndex: -1,
    });
  };

  const setActiveFruit = (fruit: IFruitData, index: number) => {
    setFruitsListState({
      ...fruitsListState,
      currentFruit: fruit,
      currentIndex: index,
    });
  };

  const removeAllFruits = () => {
    FruitDataService.deleteAll()
      .then(() => {
        refreshList();
      })
      .catch((e: Error) => {
        console.log("FruitsList error: ", e);
      });
  };

  return (
    <div className="container-outer">
      <div className="container-inner">
        <h2>I AM THE FRUITS LIST</h2>
        <ul>
          {fruits &&
            fruits.map((fruit, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveFruit(fruit, index)}
                key={index}
              >
                {fruit.fruitName}
              </li>
            ))}
        </ul>
        <button onClick={removeAllFruits}>Remove All Fruits</button>
      </div>
      <div className="container-inner">
        {currentFruit ? (
          <Fruit fruit={currentFruit} refreshList={refreshList} />
        ) : (
          <h2>Please Click On A Fruit</h2>
        )}
      </div>
    </div>
  );
};

export default FruitsList;
