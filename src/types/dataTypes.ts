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

export type OrderRequest = Readonly<{
  ingredients: readonly string[];
}>;

export type OrderData = Readonly<{
  name: string;
  number: string | number;
}>;

export type OrderResponseData = Readonly<{
  name: string;
  order: {
    number: string | number;
  };
}>;

export type LoginRequest = Readonly<{
  email: string;
  password: string;
}>;

export type RegistrationRequest = Readonly<{
  name: string;
  email: string;
  password: string;
}>;

export type RenewPasswordRequest = Readonly<{
  password: string;
  token: string;
}>;

export type UpdateUserInfoRequest = RegistrationRequest;

export type UserInfo = {
  name: string;
  email: string;
};

export type GetUserInfoResponseData = {
  user: UserInfo;
};

export type RefreshTokenResponseData = {
  refreshToken: string;
  accessToken: string;
};
