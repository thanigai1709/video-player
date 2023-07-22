import { UUID, formatTime } from "../../../../utils";
import styles from "./Annotator.module.css";
import Icon from "../../../../icons/index";
import { ChangeEvent, useState } from "react";
import { Annotation } from "../../../../types";
import AnnotationControls from "../AnnotationControls";

interface AnnotatorProps {
	currentTimestamp: number;
	onAnnotationSubmit: (e: Annotation) => void;
	onAnnotationChange: () => void;
}

interface AnnotatorState {
	timeStampEnabled: boolean;
	commentText: string;
}

const Annotator: React.FC<AnnotatorProps> = ({ currentTimestamp, onAnnotationSubmit, onAnnotationChange }) => {
	const [annotatorState, setAnnotatorState] = useState<AnnotatorState>({
		timeStampEnabled: true,
		commentText: "",
	});

	const handleCommentText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAnnotatorState((prev) => ({
			...prev,
			commentText: e.target.value,
		}));
		if (e.target.value.length > 0) {
			onAnnotationChange();
		}
	};

	const handleTimeStamp = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log(e.target);
		setAnnotatorState((prev) => ({
			...prev,
			timeStampEnabled: !prev.timeStampEnabled,
		}));
	};

	const handleAnnotationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onAnnotationSubmit({
			timestamp: annotatorState.timeStampEnabled ? currentTimestamp : 0,
			comment: annotatorState.commentText,
			userId: "12312asdas",
			userName: "User",
			id: UUID(),
			createdAt: new Date().toISOString(),
		});
		setAnnotatorState((prev) => ({
			...prev,
			commentText: "",
		}));
		e.currentTarget.reset();
	};

	return (
		<div className={styles.annotator__container} tabIndex={0}>
			<form onSubmit={handleAnnotationSubmit}>
				<div className={styles.annotator__inputbox}>
					<div className={styles.annotator__avatar}>
						<span>U</span>
					</div>
					<textarea
						className={styles.annotator__textarea}
						placeholder="Leave your comment here..."
						value={annotatorState.commentText}
						onChange={handleCommentText}
					/>
				</div>
				<div className={styles.annotator__footer}>
					<div
						className={
							annotatorState.timeStampEnabled
								? styles.annotator__current_timestamp
								: `${styles.annotator__current_timestamp} ${styles.annotator__current_timestamp__inactive}`
						}
						role="button"
						tabIndex={0}
						onClick={handleTimeStamp}
					>
						<Icon
							width="18px"
							height="18px"
							color={annotatorState.timeStampEnabled ? "#5242ff" : "#aab3c480"}
							name="timer"
						/>
						{formatTime(currentTimestamp)}
						<Icon
							width="20px"
							height="20px"
							color={annotatorState.timeStampEnabled ? "#5242ff" : "#aab3c480"}
							name={annotatorState.timeStampEnabled ? "checkbox--checked" : "checkbox--unchecked"}
						/>
					</div>
					<div className={styles.annotator__footer_left}>
						<AnnotationControls />
						<button className={styles.annotator__send} disabled={annotatorState.commentText.length > 0 ? false : true}>
							Send
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Annotator;
