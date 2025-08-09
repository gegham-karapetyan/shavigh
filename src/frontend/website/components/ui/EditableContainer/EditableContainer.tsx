"use client";
import { FC, PropsWithChildren } from "react";
import "./style.css";
import EditIcon from "./edit-icon.svg";

export const EditableContainer: FC<
  PropsWithChildren<{ onEdit?: () => void; className?: string }>
> = ({ children, onEdit, className }) => {
  return (
    <div className={`editable-wrapper ${className || ""}`}>
      <div className="edit-btn-container">
        <button className="edit-btn" onClick={onEdit}>
          <EditIcon className="w-5" />
        </button>
      </div>

      {children}
    </div>
  );
};
