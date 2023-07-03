type IconProp = {
	width: string;
	height: string;
	color: string;
};

const Pause: React.FC<IconProp> = ({ width = "10px", height = "10px", color = "#000000" }) => {
	return (
		<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
			<path
				fill={color}
				d="M615-200q-24.75 0-42.375-17.625T555-260v-440q0-24.75 17.625-42.375T615-760h55q24.75 0 42.375 17.625T730-700v440q0 24.75-17.625 42.375T670-200h-55Zm-325 0q-24.75 0-42.375-17.625T230-260v-440q0-24.75 17.625-42.375T290-760h55q24.75 0 42.375 17.625T405-700v440q0 24.75-17.625 42.375T345-200h-55Z"
			/>
		</svg>
	);
};

export default Pause;
