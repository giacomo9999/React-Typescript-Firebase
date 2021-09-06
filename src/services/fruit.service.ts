import firebase from "../firebase";
import IFruitData from "../types/fruit.type";

const db = firebase.ref("/fruits");

class FruitDataService {
  getAll() {
    return db;
  }

  create(fruit: IFruitData) {
    return db.push(fruit);
  }

  update(key: string, value: any) {
    return db.child(key).update(value);
  }

  delete(key: string) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new FruitDataService();
