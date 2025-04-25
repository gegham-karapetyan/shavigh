/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { SettingName } from "../appSettings";

import { createContext, ReactNode, useContext, useMemo } from "react";

import { DEFAULT_SETTINGS } from "../appSettings";

type SettingsContextShape = {
  settings: Record<SettingName, boolean>;
};

const Context: React.Context<SettingsContextShape> = createContext({
  settings: DEFAULT_SETTINGS,
});

export const SettingsContext = ({ children }: { children: ReactNode }) => {
  const value = useMemo(() => {
    return { settings: DEFAULT_SETTINGS };
  }, []);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSettings = (): SettingsContextShape => {
  return useContext(Context);
};
