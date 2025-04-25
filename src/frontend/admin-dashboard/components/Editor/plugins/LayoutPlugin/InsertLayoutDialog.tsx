/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { LexicalEditor } from "lexical";
import * as React from "react";
import { useState } from "react";

import Button from "../../ui/Button";
import DropDown, { DropDownItem } from "../../ui/DropDown";
import { INSERT_LAYOUT_COMMAND } from "./LayoutPlugin";

// const LAYOUTS = [
//   { label: "2 columns (equal width)", value: "1fr 1fr" },
//   { label: "2 columns (25% - 75%)", value: "1fr 3fr" },
//   { label: "3 columns (equal width)", value: "1fr 1fr 1fr" },
//   { label: "3 columns (25% - 50% - 25%)", value: "1fr 2fr 1fr" },
//   { label: "4 columns (equal width)", value: "1fr 1fr 1fr 1fr" },
// ];
const LAYOUTS = [
  { label: "2 columns (equal width)", value: "var(--grid-2-equal-columns)" },
  { label: "2 columns (25% - 75%)", value: "var(--grid-2-25-75-columns)" },
  { label: "3 columns (equal width)", value: "var(--grid-3-equal-columns)" },
  {
    label: "3 columns (25% - 50% - 25%)",
    value: "var(--grid-3-25-50-25-columns)",
  },
  { label: "4 columns (equal width)", value: "var(--grid-4-equal-columns)" },
];

export default function InsertLayoutDialog({
  activeEditor,
  onClose,
}: {
  activeEditor: LexicalEditor;
  onClose: () => void;
}) {
  const [layout, setLayout] = useState(LAYOUTS[0].value);
  const buttonLabel = LAYOUTS.find((item) => item.value === layout)?.label;

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_LAYOUT_COMMAND, layout);
    onClose();
  };

  return (
    <>
      <DropDown
        buttonClassName="toolbar-item dialog-dropdown"
        buttonLabel={buttonLabel}
      >
        {LAYOUTS.map(({ label, value }) => (
          <DropDownItem
            key={value}
            className="item"
            onClick={() => setLayout(value)}
          >
            <span className="text">{label}</span>
          </DropDownItem>
        ))}
      </DropDown>
      <Button onClick={onClick}>Insert</Button>
    </>
  );
}
