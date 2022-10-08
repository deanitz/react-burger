import { useState, useCallback } from "react";

const useModal = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const show = useCallback(() => {
    setIsDisplayed(true);
  }, []);

  const close = useCallback(() => {
    setIsDisplayed(false);
  }, []);

  return {
    isDisplayed,
    show,
    close,
  };
};

export default useModal;
