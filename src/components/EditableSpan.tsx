import { useState, type ChangeEvent } from "react";

type EditablePropsType = {
  title: string;
  changeTodoTitle: (newTitle: string) => void;
  className?: string;
};

export const EditableSpan = ({ title, changeTodoTitle, className,}: EditablePropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [itemTitle, setItemTitle] = useState(title);
  const onEditMode = () => setEditMode(true);
  const offEditMode = () => {
    changeTodoTitle(itemTitle);
    setEditMode(false);
  };
  const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      autoFocus
      value={itemTitle}
      onChange={changeInput}
      onBlur={offEditMode}
    />
  ) : (
    <span onDoubleClick={onEditMode} className={className}>
      {title}
    </span>
  );
};
