import { useState } from "react";
import { InputChangeEventFunc } from "../types/utilityTypes";

export function useForm<T>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: InputChangeEventFunc) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
