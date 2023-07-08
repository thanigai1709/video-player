import Icon from "../../../../icons";
import { Annotation } from "../../../../types";
import { formatTime } from "../../../../utils";
import styles from "./Annotations.module.css";
interface AnnotationList {
	annotations: Annotation[];
	onDelete: () => void;
	onSelect: (e: Annotation) => void;
	selectedAnnotation: Annotation | null;
}

const AnnotationList: React.FC<AnnotationList> = ({ annotations, onSelect, selectedAnnotation }) => {
	const handleSelect = (a: Annotation) => {
		onSelect(a);
	};

	return (
		<div>
			{annotations.map((a) => (
				<div
					className={
						selectedAnnotation && selectedAnnotation.id === a.id
							? `${styles.annotationcard} ${styles.annotationcard__active}`
							: styles.annotationcard
					}
					key={a.id}
					onClick={() => handleSelect(a)}
					tabIndex={0}
				>
					<div className={styles.annotationcard__header}>
						<div className={styles.annotationcard__user_avatar}>U</div>
						<span>{a.userName}</span>
					</div>
					<div className={styles.annotationcard__body}>
						{a.timestamp > 0 && <span className={styles.annotationcard__timestamp}>{formatTime(a.timestamp)}</span>}
						<span className={styles.annotationcard__comment}>{a.comment}</span>
					</div>
					<div className={styles.annotationcard__footer}>
						<div className={styles.annotationcard__footer_left}>
							<span className={styles.annotationcard__like_btn} role="button" tabIndex={0} title="Like comment">
								<Icon name="thumbsup" width="15px" height="15px" color="#b8c1cf" />
							</span>
						</div>
						<div className={styles.annotationcard__footer_right}>
							<span className={styles.annotationcard__del_btn} role="button" tabIndex={0} title="Delete comment">
								<Icon name="trash" width="15px" height="15px" color="#b8c1cf" />
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnnotationList;
