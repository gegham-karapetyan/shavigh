"use client";
import { IconButton } from "../ui/buttons/IconButton";

const minScale = -6;
const maxScale = 6;
const scaleStep = 2;
const getTextScaleFactor = () => {
  return Number.parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--text-scale-factor"
    )
  );
};
const setTexSize = (size: number) => {
  document.documentElement.style.setProperty(
    "--text-scale-factor",
    `${size}px`
  );
};
export const ConfigBar = () => {
  const onZoomIn = () => {
    const currentScale = getTextScaleFactor();
    if (currentScale < maxScale) {
      setTexSize(currentScale + scaleStep);
    }
  };
  const onZoomOut = () => {
    const currentScale = getTextScaleFactor();
    if (currentScale > minScale) {
      setTexSize(currentScale - scaleStep);
    }
  };
  return (
    <div className="bg-primary py-1 px-2.5 lg:px-[60px] items-center flex flex-row justify-end">
      <p className="text-white tracking-widest text-xs lg:text-sm mr-1.5">
        ՏԱՌԱՉԱՓԸ
      </p>
      <IconButton onClick={onZoomOut}>A-</IconButton>
      <IconButton onClick={onZoomIn}>A+</IconButton>
    </div>
  );
};
