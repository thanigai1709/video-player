import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import Menu from "./components/Menu/Menu";
import Annotator from "./components/Annotator/Annotator";
import { formatTime } from "../../utils";
import { Annotation } from "../../types";
import Icon from "../../icons";
import AnnotationList from "./components/AnnotationList";

interface PlayerProps {
	src: string;
}

interface VideoPlayer {
	isPlaying: boolean;
	volume: number;
	totalDuration: number | typeof Infinity;
	currentTime: number;
	fullscreen: boolean;
	seekDrag: boolean;
	isReady: boolean;
	isInteruppted: boolean;
	annotations: Annotation[];
	activeAnnotation: Annotation | null;
	scrubHover: boolean;
	scrubTime: number;
	bufferedTime: number;
	loop: boolean;
}

const Player: React.FC<PlayerProps> = ({ src }) => {
	const playerRef = useRef<HTMLVideoElement>(null);
	const hoverTimeStampRef = useRef<HTMLDivElement>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);
	const [playerState, setPlayerState] = useState<VideoPlayer>({
		isPlaying: false,
		volume: 0,
		totalDuration: 0,
		currentTime: 0,
		fullscreen: false,
		seekDrag: false,
		isReady: false,
		isInteruppted: false,
		annotations: [],
		activeAnnotation: null,
		scrubHover: false,
		scrubTime: 0,
		bufferedTime: 0,
		loop: false,
	});

	useEffect(() => {
		if (playerRef.current) {
			playerRef.current.addEventListener("loadedmetadata", initMetaData);
			playerRef.current.addEventListener("ended", handleVideoEnd);
			playerRef.current.addEventListener("timeupdate", updateCurrentTime);
			playerRef.current.addEventListener("progress", () => updateBufferProgress());
		}

		if (window) {
			window.addEventListener("keydown", handleKeyBoardMacros);
			document.addEventListener("fullscreenchange", handleExitFullScreen);
			document.addEventListener("mozfullscreenchange", handleExitFullScreen);
			document.addEventListener("webkitfullscreenchange", handleExitFullScreen);
		}

		return () => {
			//clean up
			if (playerRef.current) {
				playerRef.current.removeEventListener("loadedmetadata", initMetaData);
				playerRef.current.removeEventListener("ended", handleVideoEnd);
				playerRef.current.removeEventListener("timeupdate", updateCurrentTime);
				playerRef.current.addEventListener("progress", () => updateBufferProgress());
			}
			window.removeEventListener("keydown", handleKeyBoardMacros);
			document.removeEventListener("fullscreenchange", handleExitFullScreen);
			document.removeEventListener("mozfullscreenchange", handleExitFullScreen);
			document.removeEventListener("webkitfullscreenchange", handleExitFullScreen);
		};
	}, []);

	const initMetaData = (): void => {
		if (playerRef.current) {
			let annotations = JSON.parse(localStorage.getItem("annotations")) || [];
			console.log(annotations, "annotations from storage");
			setPlayerState({
				isPlaying: false,
				volume: playerRef.current.volume,
				totalDuration: playerRef.current.duration,
				currentTime: playerRef.current.currentTime,
				fullscreen: false,
				seekDrag: false,
				isReady: true,
				isInteruppted: false,
				annotations: annotations,
				activeAnnotation: null,
				scrubHover: false,
				scrubTime: 0,
				bufferedTime: 0,
				loop: false,
			});
			updateBufferProgress();
		}
	};

	const updateCurrentTime = (): void => {
		if (playerRef.current) {
			setPlayerState((prev) => ({
				...prev,
				currentTime: playerRef.current.currentTime,
			}));
		}
	};

	const handleVideoEnd = (): void => {
		setPlayerState((prev) => ({
			...prev,
			isPlaying: false,
		}));
	};

	useEffect(() => {
		if (playerRef.current) {
			if (playerState.isPlaying) {
				playerRef.current?.play();
			} else {
				playerRef.current?.pause();
			}
		}
	}, [playerState.isPlaying]);

	useEffect(() => {
		if (playerRef.current) {
			playerRef.current.loop = playerState.loop;
		}
	}, [playerState.loop]);

	useEffect(() => {
		if (playerState.activeAnnotation) {
			console.log("active annotation set");
			setPlayerState((prev) => ({
				...prev,
				isPlaying: false,
				currentTime: playerState.activeAnnotation.timestamp,
			}));
			playerRef.current.currentTime = playerState.activeAnnotation.timestamp;
		}
	}, [playerState.activeAnnotation]);

	const handlePlayPause = () => {
		setPlayerState((prev) => ({
			...prev,
			isPlaying: !prev.isPlaying,
			activeAnnotation: !prev.isPlaying && prev.activeAnnotation ? null : prev.activeAnnotation,
		}));
	};

	const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
		let playerVolume: number = Number(e.target.value) / 10;
		console.log(playerVolume, "value");
		if (playerRef.current && typeof playerRef.current.volume !== "undefined") {
			playerRef.current.volume = playerVolume;
		}
		setPlayerState((prev) => ({
			...prev,
			volume: playerVolume,
		}));
	};

	const handlePlayBackSpeedChange = (e: any) => {
		console.log(e, "playback");
		if (playerRef.current) {
			playerRef.current.playbackRate = e.value;
		}
	};

	const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
		const progressBar = e.currentTarget;
		const boundingRect = progressBar.getBoundingClientRect();
		const clickX = e.clientX - boundingRect.left;
		const progressBarWidth = boundingRect.width;
		const clickPercentage = clickX / progressBarWidth;
		const newTime = clickPercentage * playerState.totalDuration;
		console.log(
			"progress bar =>",
			progressBar,
			"boundingRect =>",
			boundingRect,

			"clickX=>",
			clickX,
			"progressBarWidth=>",
			progressBarWidth
		);
		console.log(newTime, "new time in seconds");
		if (playerRef.current) {
			playerRef.current.currentTime = newTime;
			setPlayerState((prev: VideoPlayer) => ({
				...prev,
				currentTime: newTime,
			}));
		}
	};

	const handleKeyBoardMacros = (e: KeyboardEvent) => {
		//@ts-ignore
		let targetElement: HTMLElement = e.target;
		if (targetElement.tagName === "BODY") {
			switch (e.code) {
				case "Space":
					handlePlayPause();
					return;
				case "ArrowRight":
					handleForward(5);
					return;
				case "ArrowLeft":
					handleBackward(5);
					return;
				case "ArrowUp":
					handleVolumeUpDown(0.05, "+");
					return;
				case "ArrowDown":
					handleVolumeUpDown(0.05, "-");
					return;
				case "KeyK":
					handlePlayPause();
					return;
			}
		}
	};

	const handleSeekMouseDown = () => {
		setPlayerState((prev) => ({ ...prev, seekDrag: true }));
	};

	const handleSeekMouseUp = () => {
		setPlayerState((prev) => ({ ...prev, seekDrag: false }));
	};

	const handleVolumeUpDown = (vol: number, action: string) => {
		if (playerRef.current) {
			if (action === "+") {
				let newVol = playerRef.current.volume + vol;
				playerRef.current.volume = newVol > 1 ? 1 : newVol;
				setPlayerState((prev) => ({
					...prev,
					volume: newVol > 1 ? 1 : newVol,
				}));
			}
			if (action === "-") {
				let newVol = playerRef.current.volume - vol;
				playerRef.current.volume = newVol < 0 ? 0 : newVol;
				setPlayerState((prev) => ({
					...prev,
					volume: newVol < 0 ? 0 : newVol,
				}));
			}
		}
	};

	const handleForward = (fSeconds: number) => {
		if (playerRef.current) {
			let newTime = playerRef.current.currentTime + fSeconds;
			playerRef.current.currentTime = newTime;
			setPlayerState((prev) => ({ ...prev, currentTime: playerRef.current.currentTime }));
		}
	};

	const handleBackward = (bSeconds: number) => {
		if (playerRef.current) {
			let newTime = playerRef.current.currentTime - bSeconds;
			playerRef.current.currentTime = newTime;
			setPlayerState((prev) => ({ ...prev, currentTime: playerRef.current.currentTime }));
		}
	};

	const handleSeekMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		if (playerState.seekDrag) {
			const progressBar = e.currentTarget;
			const boundingRect = progressBar.getBoundingClientRect();
			const clickX = e.clientX - boundingRect.left;
			const progressBarWidth = boundingRect.width;
			const clickPercentage = clickX / progressBarWidth;
			const newTime = clickPercentage * playerState.totalDuration;
			console.log(
				"progress bar =>",
				progressBar,
				"boundingRect =>",
				boundingRect,
				"clickX=>",
				clickX,
				"progressBarWidth=>",
				progressBarWidth
			);
			console.log(newTime, "new time in seconds");
			if (playerRef.current) {
				playerRef.current.currentTime = newTime;
				setPlayerState((prev: VideoPlayer) => ({
					...prev,
					currentTime: newTime,
				}));
			}
		}

		if (playerState.scrubHover) {
			const progressBar = e.currentTarget;
			const boundingRect = progressBar.getBoundingClientRect();
			const clickX = e.clientX - boundingRect.left;
			const progressBarWidth = boundingRect.width;
			const hoverPercentage = clickX / progressBarWidth;
			const newHoverTime = hoverPercentage * playerState.totalDuration;
			const hoverTimeStampWidth = hoverTimeStampRef.current.getBoundingClientRect().width;
			const hoverTimeStampWidthPrcnt = (hoverTimeStampWidth / progressBarWidth) * 100;
			let newHoverTimeInDistance = Math.max(
				(newHoverTime / playerState.totalDuration) * 100 - hoverTimeStampWidthPrcnt,
				0
			);
			hoverTimeStampRef.current.style.left = `${newHoverTimeInDistance}%`;
			setPlayerState((prev: VideoPlayer) => ({
				...prev,
				scrubTime: newHoverTime,
			}));
		}
	};

	const handleEnterFullScreen = () => {
		//@ts-ignore
		if (!playerRef.current) return;
		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen();
			//@ts-ignore
		} else if (playerRef.current?.mozRequestFullScreen) {
			// Firefox
			//@ts-ignore
			playerRef.current.mozRequestFullScreen();
			//@ts-ignore
		} else if (playerRef.current.webkitRequestFullscreen) {
			// Chrome, Safari, Opera
			//@ts-ignore
			playerRef.current.webkitRequestFullscreen();
		}
		setPlayerState((prev) => ({
			...prev,
			fullscreen: true,
		}));
	};

	const handleExitFullScreen = () => {
		//@ts-ignore
		const isFullscreen =
			//@ts-ignore
			document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
		setPlayerState((prev) => ({
			...prev,
			fullscreen: isFullscreen,
		}));
	};

	const handleAnnotationAdded = (e: Annotation) => {
		localStorage.setItem("annotations", JSON.stringify([...playerState.annotations, e]));
		setPlayerState((prev) => ({
			...prev,
			annotations: [...prev.annotations, e],
			isPlaying: prev.isInteruppted ? true : false,
			isInteruppted: false,
			activeAnnotation: null,
		}));
	};

	const handleAnnotationAdding = () => {
		if (playerState.isPlaying) {
			setPlayerState((prev) => ({
				...prev,
				isPlaying: false,
				isInteruppted: true,
			}));
		}
	};

	const handleCommentSelect = (e: Annotation) => {
		setPlayerState((prev) => ({
			...prev,
			activeAnnotation: e,
		}));
	};

	const handleSeekMouseEnter = () => {
		setPlayerState((prev) => ({
			...prev,
			scrubHover: true,
		}));
	};

	const handleSeekMouseLeave = () => {
		setPlayerState((prev) => ({
			...prev,
			scrubHover: false,
		}));
	};

	const updateBufferProgress = () => {
		if (playerRef.current && playerRef.current.buffered.length > 0) {
			let bufferedTime = 0;
			for (let i = 0; i < playerRef.current.buffered.length; i++) {
				if (
					playerRef.current.buffered.start(i) <= playerRef.current.currentTime &&
					playerRef.current.buffered.end(i) >= playerRef.current.currentTime
				) {
					bufferedTime = playerRef.current.buffered.end(i);
					break;
				}
			}
			setPlayerState((prev) => ({
				...prev,
				bufferedTime: bufferedTime,
			}));
		}
	};

	const handleRepeat = () => {
		setPlayerState((prev) => ({
			...prev,
			loop: !prev.loop,
		}));
	};

	return (
		<div className="video-parent__container">
			<div
				className={styles.container}
				ref={playerContainerRef}
				style={!playerState.isReady ? { visibility: "hidden" } : {}}
			>
				<div className={styles.video_player__container}>
					<video className={styles.container_video_player} ref={playerRef} src={src}></video>
					<div className={styles.video_player__bottom}>
						<div className={styles.video_player__bottom_container}>
							<div className={styles.seek_bars__container}>
								<div
									className={styles.seek__interaction_layer}
									onClick={handleProgressClick}
									onMouseDown={handleSeekMouseDown}
									onMouseMove={handleSeekMouseMove}
									onMouseUp={handleSeekMouseUp}
									onMouseEnter={handleSeekMouseEnter}
									onMouseLeave={handleSeekMouseLeave}
									role="button"
								></div>
								<div
									className={styles.seek__progressBar}
									style={{ width: `${(playerState.currentTime / playerState.totalDuration) * 100}%` }}
								></div>
								<div className={styles.seek__scrubber_timestamp} ref={hoverTimeStampRef}>
									{formatTime(playerState.scrubTime)}
								</div>
								<div
									className={styles.seek__scrubber}
									data-timestamp={`${formatTime(playerState.scrubTime)}`}
									style={{ width: `${(playerState.scrubTime / playerState.totalDuration) * 100}%` }}
								></div>
								<div
									className={styles.seek__buffer}
									style={{ width: `${(playerState.bufferedTime / playerState.totalDuration) * 100}%` }}
								></div>
							</div>
							<div className={styles.video_player__controls}>
								<div className={styles.video_player__controls_col}>
									<span
										onClick={handlePlayPause}
										className={`${styles.video_player__controls_play_btn} ${styles.player_control}`}
										title="Play"
									>
										{playerState.isPlaying ? (
											<Icon width="32" height="32" color="#fff" name="pause" />
										) : (
											<Icon width="32" height="32" color="#fff" name="play" />
										)}
									</span>
									<span
										onClick={handleRepeat}
										className={
											playerState.loop
												? `${styles.player_control} ${styles.player_control__active}`
												: styles.player_control
										}
										title="Loop"
									>
										<Icon width="23px" height="23px" color={playerState.loop ? "#5b53ff" : "#fff"} name="repeat" />
									</span>
									<Menu
										name="Playback Speed"
										menuItems={[
											{ name: "0.25x", value: 0.25 },
											{ name: "0.5x", value: 0.5 },
											{ name: "0.75x", value: 0.75 },
											{ name: "1x", value: 1.0 },
											{ name: "1.25x", value: 1.25 },
											{ name: "1.50x", value: 1.5 },
											{ name: "1.75x", value: 1.75 },
											{ name: "2x", value: 2.0 },
										]}
										defaultValue={{ name: "1x", value: 1.0 }}
										onChange={handlePlayBackSpeedChange}
									/>
									<input
										type="range"
										style={{ accentColor: "#fff" }}
										min={0}
										max={10}
										step={0.5}
										onChange={handleVolumeChange}
										className={styles.player_control}
										value={playerState.volume * 10}
										title="Volume"
									/>
								</div>
								<div className={`${styles.video_player__controls_col} ${styles.middle}`}>
									<div className={styles.video_player__time_display}>
										<span className={styles.video_player__time_display__current_time}>
											{formatTime(playerState.currentTime)}
										</span>
										<span className={styles.video_player__time_display__separator}> &nbsp;/&nbsp;</span>
										<span className={styles.video_player__time_display__total_time}>
											{formatTime(playerState.totalDuration)}
										</span>
									</div>
								</div>
								<div className={`${styles.video_player__controls_col} ${styles.right}`}>
									<Menu
										name="Video Quality"
										menuItems={[
											{ name: "1080p", value: 1080 },
											{ name: "720p", value: 720 },
											{ name: "360p", value: 360 },
										]}
										defaultValue={{ name: "720p", value: 720 }}
										onChange={() => {}}
									/>
									<span
										className={`${styles.video_player__controls_fullscreen} ${styles.player_control}`}
										onClick={handleEnterFullScreen}
										title="Fullscreen"
									>
										{playerState.fullscreen ? (
											<Icon width="32" height="32" color="#fff" name="fullscreen-exit" />
										) : (
											<Icon width="32" height="32" color="#fff" name="fullscreen" />
										)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Annotator
					currentTimestamp={playerState.currentTime}
					onAnnotationSubmit={handleAnnotationAdded}
					onAnnotationChange={handleAnnotationAdding}
				/>
			</div>
			<aside className={styles.details__pane}>
				<div className={styles.annotations_list}>
					<div className={styles.annotations_list__header}>
						<Icon name="comments" width="20px" height="20px" color="#fff" /> Comments ({playerState.annotations.length})
					</div>
					<AnnotationList
						annotations={playerState.annotations}
						selectedAnnotation={playerState.activeAnnotation}
						onDelete={() => {}}
						onSelect={handleCommentSelect}
					/>
				</div>
			</aside>
		</div>
	);
};

export default Player;
