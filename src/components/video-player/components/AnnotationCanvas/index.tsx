import { useEffect, useRef, useState } from "react";
import styles from "./AnnotationCanvas.module.css";

interface AnnotationCanvasProps {
	width: number;
	height: number;
}

interface CanvasState {
	isDrawing: boolean;
	x1: number[];
	x2: number[];
	y1: number[];
	y2: number[];
}

type Rect = {
	tool: "rect";
	color: string;
	size: number;
	x: number;
	y: number;
	w: number;
	h: number;
};

type Pen = {
	tool: "pen";
	color: string;
	size: number;
	xs: number[];
	ys: number[];
};

type Line = {
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

const AnnotationCanvas: React.FC<AnnotationCanvasProps> = ({ width, height }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);
	const [canvasState, setCanvasState] = useState<CanvasState>({
		isDrawing: false,
		x1: [],
		x2: [],
		y1: [],
		y2: [],
	});
	const [tool, setTool] = useState<DrawingTools>("line");
	const [color, setcolor] = useState<string>("cyan");
	const [annotations, setAnnotations] = useState<DrawingAnnotation[]>([]);

	useEffect(() => {
		console.log("use hook running");
		if (canvasRef.current) {
			contextRef.current = canvasRef.current.getContext("2d");
			renderDrawingAnnotations();
		}
	}, []);

	useEffect(() => {
		renderDrawingAnnotations();
	}, [width]);

	const clearCanvas = () => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext("2d");
			if (context) {
				context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			}
		}
	};

	const renderDrawingAnnotations = () => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext("2d");
			if (context) {
				clearCanvas();
				annotations.forEach((annotation: DrawingAnnotation) => {
					if (annotation.tool === "rect") {
						context.strokeStyle = annotation.color;
						context.lineWidth = annotation.size;
						context.strokeRect(annotation.x * width, annotation.y * width, annotation.w * width, annotation.h * width);
					} else if (annotation.tool === "pen") {
						context.strokeStyle = annotation.color;
						context.lineWidth = annotation.size;
						context.moveTo(annotation.xs[0] * width, annotation.ys[0] * width);
						for (let i = 1; i < annotation.xs.length; i++) {
							context.lineTo(annotation.xs[i] * width, annotation.ys[i] * width);
						}
						context.stroke();
						context.beginPath();
					} else if (annotation.tool === "line") {
						context.strokeStyle = annotation.color;
						context.lineWidth = annotation.size;
						context.beginPath();
						context.moveTo(annotation.x1 * width, annotation.y1 * width);
						context.lineTo(annotation.x2 * width, annotation.y2 * width);
						context.stroke();
					}
				});
			}
		}
	};

	const startDrawing = (e: React.MouseEvent) => {
		const canvasBoundingClient = canvasRef.current?.getBoundingClientRect();
		contextRef.current = canvasRef.current.getContext("2d");
		contextRef.current.beginPath();
		contextRef.current.moveTo(
			e.clientX - (canvasBoundingClient.left || 0),
			e.clientY - (canvasBoundingClient.top || 0)
		);
		contextRef.current.strokeStyle = color;
		contextRef.current.lineWidth = 2;

		if (tool === "rect") {
			setCanvasState((prev) => ({
				...prev,
				x1: [e.clientX - (canvasBoundingClient?.left || 0)],
				y1: [e.clientY - (canvasBoundingClient?.top || 0)],
				x2: [e.clientX - (canvasBoundingClient?.left || 0)],
				y2: [e.clientY - (canvasBoundingClient?.top || 0)],
				isDrawing: true,
			}));
		}
		if (tool === "pen") {
			contextRef.current.lineCap = "round";
			contextRef.current.lineJoin = "round";
			setCanvasState((prev) => ({
				...prev,
				x1: [...prev.x1, e.clientX - (canvasBoundingClient?.left || 0)],
				y1: [...prev.y1, e.clientY - (canvasBoundingClient?.top || 0)],
				isDrawing: true,
			}));
		}

		if (tool === "line") {
			contextRef.current.lineCap = "round";
			contextRef.current.lineJoin = "round";
			setCanvasState((prev) => ({
				...prev,
				x1: [...prev.x1, e.clientX - (canvasBoundingClient?.left || 0)],
				y1: [...prev.y1, e.clientY - (canvasBoundingClient?.top || 0)],
				isDrawing: true,
			}));
		}
	};

	const handleDrawing = (e: React.MouseEvent) => {
		if (canvasRef.current && canvasState.isDrawing) {
			const canvasBoundingClient = canvasRef.current.getBoundingClientRect();
			const clientX = e.clientX - (canvasBoundingClient.left || 0);
			const clientY = e.clientY - (canvasBoundingClient.top || 0);

			if (tool === "rect") {
				clearCanvas();
				renderDrawingAnnotations();
				contextRef.current.strokeRect(
					canvasState.x1[0],
					canvasState.y1[0],
					clientX - canvasState.x1[0],
					clientY - canvasState.y1[0]
				);
				setCanvasState((prev) => ({
					...prev,
					x2: [clientX],
					y2: [clientY],
				}));
			}

			if (tool === "pen") {
				contextRef.current.lineTo(clientX, clientY);
				contextRef.current.stroke();
				setCanvasState((prev) => ({
					...prev,
					x1: [...prev.x1, clientX],
					y1: [...prev.y1, clientY],
				}));
			}

			if (tool === "line") {
				clearCanvas();
				renderDrawingAnnotations();
				contextRef.current.lineCap = "round";
				contextRef.current.lineJoin = "round";
				contextRef.current.beginPath();
				contextRef.current.moveTo(canvasState.x1[0], canvasState.y1[0]);
				contextRef.current.lineTo(clientX, clientY);
				contextRef.current.stroke();
				setCanvasState((prev) => ({
					...prev,
					x2: [e.clientX - (canvasBoundingClient?.left || 0)],
					y2: [e.clientY - (canvasBoundingClient?.top || 0)],
					isDrawing: true,
				}));
			}
		}
	};

	const endDrawing = () => {
		const canvasSize = canvasRef.current.width || 1;
		if (tool === "rect") {
			setAnnotations([
				...annotations,
				{
					tool: tool,
					color: color,
					size: 2,
					x: canvasState.x1[0] / canvasSize,
					y: canvasState.y1[0] / canvasSize,
					w: (canvasState.x2[0] - canvasState.x1[0]) / canvasSize,
					h: (canvasState.y2[0] - canvasState.y1[0]) / canvasSize,
				},
			]);
		}

		if (tool === "pen") {
			setAnnotations([
				...annotations,
				{
					tool: tool,
					color: color,
					size: 2,
					xs: canvasState.x1.map((x) => x / canvasSize),
					ys: canvasState.y1.map((y) => y / canvasSize),
				},
			]);
		}

		if (tool === "line") {
			setAnnotations([
				...annotations,
				{
					tool: tool,
					color: color,
					size: 2,
					x1: canvasState.x1[0] / canvasSize,
					y1: canvasState.y1[0] / canvasSize,
					x2: canvasState.x2[0] / canvasSize,
					y2: canvasState.y2[0] / canvasSize,
				},
			]);
		}

		setCanvasState((prev) => ({
			...prev,
			x1: [],
			x2: [],
			y1: [],
			y2: [],
			isDrawing: false,
		}));
	};

	return (
		<div className={styles.AnnotationCanvas__container}>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				onMouseDown={startDrawing}
				onMouseMove={handleDrawing}
				onMouseUp={endDrawing}
			></canvas>
		</div>
	);
};

export default AnnotationCanvas;
