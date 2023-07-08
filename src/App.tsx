import "./App.css";
import Player from "./components/video-player/Player";
import video1 from "./assets/demo.mp4";

function App() {
	return (
		<>
			<Player src={video1} />
		</>
	);
}

export default App;
