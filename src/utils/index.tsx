export const formatTime = (seconds: number): string => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	const timeParts = [];
	if (hours > 0) {
		timeParts.push(hours.toString().padStart(2, "0"));
	}
	timeParts.push(minutes.toString().padStart(2, "0"));
	timeParts.push(remainingSeconds.toString().padStart(2, "0"));

	return timeParts.join(":");
};
