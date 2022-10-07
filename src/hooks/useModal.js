import { useState } from "react";

const useModal = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  function show() {
    setIsDisplayed(true);
  }

  function close() {
    setIsDisplayed(false);
  }

  return {
    isDisplayed,
    show,
    close,
  };
};

export default useModal;
