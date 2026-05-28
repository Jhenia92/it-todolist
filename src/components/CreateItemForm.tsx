import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { Button } from "../Button";

type CreateItemFormPropsType = {
  createItem: (title: string) => void;
  maxTitleLength: number;
};

export const CreateItemForm = ({
  createItem,
  maxTitleLength,
}: CreateItemFormPropsType) => {
  const [itemInput, setItemInput] = useState("");
  const [error, setError] = useState(false);

  const isItemTitleValid =
    Boolean(itemInput.length) && itemInput.length <= maxTitleLength;
  const setTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }
    setItemInput(e.currentTarget.value);
  };
  const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.ctrlKey && isItemTitleValid) {
      createItemHandler();
    }
  };

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim();
    if (trimmedTitle) {
      createItem(itemInput);
    } else {
      setError(true);
    }
    setItemInput("");
  };

  return (
    <div>
      <span>
        <input
          value={itemInput}
          className={error ? "error" : ""}
          onChange={setTitleHandler}
          onKeyDown={onKeyDownCreateItemHandler}
        />
        {itemInput.length}
      </span>
      <Button
        title="+"
        disabled={!isItemTitleValid}
        onClick={createItemHandler}
      />

      {itemInput.length === 0 && (
        <div style={{ color: error ? "red" : "inherit" }}>
          Enter title end press button
        </div>
      )}
      {isItemTitleValid && (
        <div>Max title length is {maxTitleLength} charters</div>
      )}
      {itemInput.length > maxTitleLength && (
        <div style={{ color: "red" }}>Title length is too long</div>
      )}
    </div>
  );
};
