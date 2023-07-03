import "./App.css";
import Player from "./components/video-player/Player";
import video from "./assets/demo.mp4";

function App() {
	return (
		<>
			<Player src={video} />
		</>
	);
}

export default App;
