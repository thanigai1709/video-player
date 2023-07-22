import { atom } from "jotai";
import { DrawContext, DrawingAnnotation } from "../types";

export const CanvasDrawConfig = atom<DrawContext>({
	color: "#fff",
	tool: "rect",
	isCanvasActive: false,
});

export const ActiveDrawData = atom<DrawingAnnotation[]>([]);

export const DrawAnnotation = atom<DrawingAnnotation[]>([]);
