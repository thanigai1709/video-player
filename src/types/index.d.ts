export interface Annotation {
	annotations: DrawingAnnotation[] | null;
	timestamp: number | null;
	comment: string;
	userId: string;
	userName: string;
	id: string;
	createdAt: string;
}

export interface DrawContext {
	color: string;
	tool: "pen" | "rect" | "line";
	isCanvasActive: boolean;
}

interface AnnotationCanvasProps {
	width: number;
	height: number;
}

export interface DrawCanvasState {
	isDrawing: boolean;
	x1: number[];
	x2: number[];
	y1: number[];
	y2: number[];
}

export type Rect = {
	tool: "rect";
	color: string;
	size: number;
	x: number;
	y: number;
	w: number;
	h: number;
};

export type Pen = {
	tool: "pen";
	color: string;
	size: number;
	xs: number[];
	ys: number[];
};

export type Line = {
	tool: "line";
	color: string;
	size: number;
	x1: number;
	y1: number;
	x2: number;
	y2: number;
};

type DrawingAnnotation = Rect | Pen | Line;
type DrawingTools = "rect" | "line" | "pen";
