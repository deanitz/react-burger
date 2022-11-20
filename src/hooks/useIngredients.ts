import { useEffect } from "react";
import { fetchIngredients } from "../services/slices/ingredientsSlice";
import { useAppDispatch, useAppSelector } from "../utils/store";

export const useIngredients = () => {
  const dispatch = useAppDispatch();

  const { ingredientsDataError } = useAppSelector(({ ingredients }) => ({
    ingredientsDataError: ingredients.ingredientsDataError,
  }));

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (ingredientsDataError) {
      alert("Что-то пошло не так. Попробуйте еще раз.");
    }
  }, [ingredientsDataError]);
};
