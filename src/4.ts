interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): IKey;
}

interface IHouse {
  comeIn(person: IPerson): void;
  openDoor(key: IKey): void;
}

class Key implements IKey {
  private readonly signature: number;

  constructor() {
    this.signature = Math.random();
  }

  public getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  private readonly key: IKey;

  constructor(key: IKey) {
    this.key = key;
  }

  public getKey(): IKey {
    return this.key;
  }
}

abstract class House implements IHouse {
  protected door: boolean = false;
  protected key: IKey;
  protected tenants: IPerson[] = [];

  constructor(key: IKey) {
    this.key = key;
  }

  public comeIn(person: IPerson): void {
    if (this.door) {
      this.tenants.push(person);
      console.log("Person has entered the house");
    } else {
      console.log("The door is closed");
    }
  }

  public abstract openDoor(key: IKey): void;
}

class MyHouse extends House implements IHouse {
  public openDoor(key: IKey): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door is opened");
    } else {
      console.log("Wrong key!");
    }
  }
}


const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

export {};
