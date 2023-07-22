import { atom } from "jotai";
import { DrawContext } from "../types";

export const CanvasDrawConfig = atom<DrawContext>({
	color: "#fff",
	tool: "rect",
	isCanvasActive: false,
});
