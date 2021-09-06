import { ChangeEvent, useState } from "react";
import FruitDataService from "../services/fruit.service";
import IFruitData from "../types/fruit.type";
type submitFormState = IFruitData;

const AddFruit = () => {
  const emptyFruitState: submitFormState = {
    fruitName: "",
    fruitColor: "",
    fruitShape: "",
  };

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [formData, setFormData] = useState(emptyFruitState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newState = { ...formData, [e.target.name]: e.target.value };
    setFormData(newState);
  };

  const handleSubmit = (): void => {
    saveFruit(formData);
    setIsFormOpen(false);
  };

  const saveFruit = (fruit: IFruitData): void => {
    let data = {
      fruitName: fruit.fruitName,
      fruitColor: fruit.fruitColor,
      fruitShape: fruit.fruitShape,
    };
    FruitDataService.create(data)
      .then(() => {
        console.log("Created new fruit successfully.");
      })
      .catch((e: Error) => {
        console.log("Error creating fruit: ", e);
      });
  };

  const newFruit = () => {
    setFormData(emptyFruitState);
    setIsFormOpen(true);
  };

  return !isFormOpen ? (
    <div className="container-inner">
      <h1>Fruit Successfully Submitted</h1>
      <button onClick={newFruit}>Add Another Fruit</button>
    </div>
  ) : (
    <div className="container-inner">
      <form className="h-form">
        <label htmlFor="fruitName" className="h-label">
          Fruit Name
        </label>
        <input
          type="text"
          className="h-input"
          value={formData.fruitName}
          name="fruitName"
          onChange={handleChange}
        />
        <label htmlFor="fruitName" className="h-label">
          Fruit Color
        </label>
        <input
          type="text"
          className="h-input"
          value={formData.fruitColor}
          name="fruitColor"
          onChange={handleChange}
        />
        <label htmlFor="fruitName" className="h-label">
          Fruit Shape
        </label>
        <input
          type="text"
          className="h-input"
          value={formData.fruitShape}
          name="fruitShape"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit Fruit</button>
      </form>
    </div>
  );
};

export default AddFruit;
