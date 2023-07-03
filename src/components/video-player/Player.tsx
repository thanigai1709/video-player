import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import Play from "../../icons/Play";
import Pause from "../../icons/Pause";
import Fullscreen from "../../icons/Fullscreen";
import FullscreenExit from "../../icons/FullscreenExit";
import Menu from "./components/Menu/Menu";

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
}

const Player: React.FC<PlayerProps> = ({ src }) => {
	const playerRef = useRef<HTMLVideoElement>(null);
	const playerContainerRef = useRef<HTMLDivElement>(null);
	const [playerState, setPlayerState] = useState<VideoPlayer>({
		isPlaying: false,
		volume: 0,
		totalDuration: 0,
		currentTime: 0,
		fullscreen: false,
		seekDrag: false,
		isReady: false,
	});

	useEffect(() => {
		if (playerRef.current) {
			playerRef.current.addEventListener("loadedmetadata", initMetaData);
			playerRef.current.addEventListener("ended", handleVideoEnd);
			playerRef.current.addEventListener("timeupdate", updateCurrentTime);
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
			}
			window.removeEventListener("keydown", handleKeyBoardMacros);
			document.removeEventListener("fullscreenchange", handleExitFullScreen);
			document.removeEventListener("mozfullscreenchange", handleExitFullScreen);
			document.removeEventListener("webkitfullscreenchange", handleExitFullScreen);
		};
	}, []);

	const initMetaData = (): void => {
		if (playerRef.current) {
			setPlayerState({
				isPlaying: false,
				volume: playerRef.current.volume,
				totalDuration: playerRef.current.duration,
				currentTime: playerRef.current.currentTime,
				fullscreen: false,
				seekDrag: false,
				isReady: true,
			});
		}
	};

	const updateCurrentTime = (): void => {
		if (playerRef.current) {
			setPlayerState((prev: VideoPlayer) => ({
				...prev,
				currentTime: playerRef.current.currentTime,
			}));
		}
	};

	const handleVideoEnd = (): void => {
		setPlayerState((prev: VideoPlayer) => ({
			...prev,
			isPlaying: false,
		}));
		if (playerRef.current) {
			playerRef.current.currentTime = 0;
		}
	};

	useEffect(() => {
		if (playerRef.current) {
			console.log("play state change");
			if (playerState.isPlaying) {
				playerRef.current?.play();
			} else {
				playerRef.current?.pause();
			}
		}
	}, [playerState.isPlaying]);

	const handlePlayPause = () => {
		setPlayerState((prev) => ({
			...prev,
			isPlaying: !prev.isPlaying,
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
		console.log(e);
		switch (e.code) {
			case "Space":
				handlePlayPause();
				break;
			case "ArrowRight":
				handleForward(5);
				break;
			case "ArrowLeft":
				handleBackward(5);
				break;
			case "ArrowUp":
				handleVolumeUpDown(0.05, "+");
				break;
			case "ArrowDown":
				handleVolumeUpDown(0.05, "-");
				break;
			case "KeyK":
				handlePlayPause();
				break;
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
			setPlayerState((prev) => ({ ...prev, currentTime: newTime }));
		}
	};

	const handleBackward = (bSeconds: number) => {
		if (playerRef.current) {
			let newTime = playerRef.current.currentTime - bSeconds;
			playerRef.current.currentTime = newTime;
			setPlayerState((prev) => ({ ...prev, currentTime: newTime }));
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

	return (
		<div className="video-parent__container">
			<div
				className={styles.container}
				ref={playerContainerRef}
				style={!playerState.isReady ? { visibility: "hidden" } : {}}
			>
				<video className={styles.container_video_player} ref={playerRef} src={src}></video>
				<div className={styles.video_player__bottom}>
					<div className={styles.video_player__bottom_container}>
						<div className={styles.video_player__progress_bar}>
							<span style={{ width: `${(playerState.currentTime / playerState.totalDuration) * 100}%` }}></span>
							<div
								className={styles.video_player__seek_interaction_layer}
								onClick={handleProgressClick}
								onMouseDown={handleSeekMouseDown}
								onMouseMove={handleSeekMouseMove}
								onMouseUp={handleSeekMouseUp}
								role="button"
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
										<Pause width="32" height="32" color="#fff" />
									) : (
										<Play width="32" height="32" color="#fff" />
									)}
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
										<FullscreenExit width="32" height="32" color="#fff" />
									) : (
										<Fullscreen width="32" height="32" color="#fff" />
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<aside className={styles.details__pane}>
				<div></div>
			</aside>
		</div>
	);
};

export default Player;

const formatTime = (seconds: number): string => {
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
