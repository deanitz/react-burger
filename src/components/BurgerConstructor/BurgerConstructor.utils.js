export const ORDER_ACTION_SET = "set";
export const ORDER_ACTION_RESET = "reset";
export const orderIdInitial = { value: 0 };

export const orderIdReducer = (_, action) => {
  switch (action.type) {
    case "set":
      return { value: action.payload };
    case "reset":
      return orderIdInitial;
    default:
      throw new Error(`Неверный тип action: ${action.type}`);
  }
};
