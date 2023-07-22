import { CSSProperties, useEffect } from "react";
import Icon from "../../../../icons";
import { DrawingTools } from "../../../../types";
import styles from "./AnnotationControls.module.css";
import { useAtomValue, useSetAtom } from "jotai";
import { CanvasDrawConfig } from "../../../../context/CanvasDrawContext";

const AnnotationControls = () => {
	const colors = ["#e74a3c", "#e67422", "#1abca1", "#34a3db"];
	const tools: DrawingTools[] = ["rect", "line", "pen"];
	const drawConfig = useAtomValue(CanvasDrawConfig);
	const setDrawConfig = useSetAtom(CanvasDrawConfig);

	useEffect(() => {
		setDrawConfig((prev) => ({
			...prev,
			color: colors[0],
			tool: tools[0],
		}));
	}, []);

	const handleToolSelect = (tool: DrawingTools) => {
		setDrawConfig((prev) => ({
			...prev,
			tool,
		}));
	};

	const handleColorSelect = (color: string) => {
		setDrawConfig((prev) => ({
			...prev,
			color,
		}));
	};

	const toggleAnnotationControls = () => {
		setDrawConfig((prev) => ({
			...prev,
			isCanvasActive: !prev.isCanvasActive,
		}));
	};

	return (
		<div className={styles.Annotation_controls__container}>
			<div className={styles.Annotation_controls__header}>
				<button
					type="button"
					className={
						drawConfig.isCanvasActive
							? `${styles.Annotation_controls__header_btn} ${styles.Annotation_controls__header_btn__active}`
							: styles.Annotation_controls__header_btn
					}
					onClick={toggleAnnotationControls}
				>
					<Icon width="25px" height="25px" name="paint" color="#fff" />
				</button>
			</div>
			<div
				className={
					drawConfig.isCanvasActive
						? `${styles.Annotation_controls__list} ${styles.Annotation_controls__list__active}`
						: styles.Annotation_controls__list
				}
			>
				<div className={styles.Annotation_controls__list_colors}>
					{colors.map((c, i) => (
						<button
							type="button"
							className={
								drawConfig.color === c
									? `${styles.control_color} ${styles.control_color__active}`
									: styles.control_color
							}
							onClick={() => handleColorSelect(c)}
							key={`color_${i}`}
							style={
								{
									"--control-color": c,
								} as CSSProperties
							}
						></button>
					))}
				</div>
				<div className={styles.Annotation_controls__list_tools}>
					{tools.map((t, i) => (
						<button
							type="button"
							className={
								drawConfig.tool === t ? `${styles.control_tool} ${styles.control_tool__active}` : styles.control_tool
							}
							onClick={() => handleToolSelect(t)}
							key={`tool_${i}`}
						>
							<Icon width="15px" height="15px" name={t} color="#fff" />
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default AnnotationControls;
