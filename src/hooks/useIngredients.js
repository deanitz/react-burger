import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../services/slices/ingredientsSlice";

export const useIngredients = () => {
  const dispatch = useDispatch();

  const { ingredientsDataError } = useSelector(({ ingredients }) => ({
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
