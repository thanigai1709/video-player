import "./App.css";
import Player from "./components/video-player/Player";
import video from "./assets/demo-2.mp4";

function App() {
	return (
		<>
			<Player src={video} />
		</>
	);
}

export default App;
