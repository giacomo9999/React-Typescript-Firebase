import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import FruitDataService from "../services/fruit.service";
import IFruitData from "../types/fruit.type";

type Props = {
  formType: string;
  fruit: IFruitData;
  refreshList: Function;
};

const AddOrEditForm = (props: Props) => {
  const emptyformData: IFruitData = {
    key: null,
    fruitName: "",
    fruitColor: "",
    fruitShape: "",
  };

  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  const [formData, setFormData] = useState(props.fruit);
  const [message, setMessage] = useState<string>("");

  let history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log("Handling change...", formData);
    const newState = { ...formData, [e.target.name]: e.target.value };
    setFormData(newState);
  };

  const handleSubmit = (): void => {
    console.log("Handling submit...");
    saveNewFruit();
    history.push("/");
  };

  const saveNewFruit = (): void => {
    const data = {
      fruitName: formData.fruitName,
      fruitColor: formData.fruitColor,
      fruitShape: formData.fruitShape,
    };
    FruitDataService.create(data)
      .then(() => {
        setMessage("Created new fruit successfully.");
      })
      .catch((e: Error) => {
        console.log("Error creating fruit: ", e);
      });
  };

  const clearForm = () => {
    setFormData(emptyformData);
    setIsFormOpen(true);
  };

  const updateFruit = (): void => {
    if (formData.key) {
      const data = {
        fruitName: formData.fruitName,
        fruitColor: formData.fruitColor,
        fruitShape: formData.fruitShape,
      };
      FruitDataService.update(formData.key, data)
        .then(() => {
          setFormData({
            ...formData,
          });
          console.log("The fruit was updated successfully.");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  const deleteFruit = () => {
    if (formData.key) {
      FruitDataService.delete(formData.key)
        .then(props.refreshList())
        .catch((e: Error) => console.log(e));
    }
  };

  return !isFormOpen ? (
    <div className="container-inner">
      <h1>{message}</h1>
      <button onClick={clearForm}>Add Another Fruit</button>
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
        <button onClick={props.formType === "add" ? handleSubmit : updateFruit}>
          {props.formType}
        </button>
      </form>
    </div>
  );
};

export default AddOrEditForm;
