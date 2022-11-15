type IngredientShape = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v?: number;
};

export type Ingredient = Readonly<IngredientShape> & { uniqueId: string };

//TODO separate file
export interface IDropItem<TItem> {
  item: TItem;
}

type ChangeEventFunc<T extends HTMLElement> = React.ChangeEvent<T>;
export type InputChangeEventFunc = ChangeEventFunc<HTMLInputElement>;
export type FormSubmitEventFunc = React.FormEvent<HTMLFormElement>;
