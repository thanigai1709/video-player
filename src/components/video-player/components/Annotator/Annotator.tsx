import { formatTime } from "../../../../utils";
import styles from "./Annotator.module.css";
import Icon from "../../../../icons/index";
import { ChangeEvent, useState } from "react";

interface AnnotatorProps {
	currentTimestamp: number;
}

interface AnnotatorState {
	timeStampEnabled: boolean;
	commentText: string;
}

const Annotator: React.FC<AnnotatorProps> = ({ currentTimestamp }) => {
	const [annotatorState, setAnnotatorState] = useState<AnnotatorState>({
		timeStampEnabled: true,
		commentText: "",
	});

	const handleCommentText = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setAnnotatorState((prev) => ({
			...prev,
			commentText: e.target.value,
		}));
	};

	const handleTimeStamp = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log(e.target);
		setAnnotatorState((prev) => ({
			...prev,
			timeStampEnabled: !prev.timeStampEnabled,
		}));
	};

	return (
		<div className={styles.annotator__container} tabIndex={0}>
			<form>
				<div className={styles.annotator__inputbox}>
					<div className={styles.annotator__avatar}>
						<span>T</span>
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
					<button className={styles.annotator__send} disabled>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default Annotator;
