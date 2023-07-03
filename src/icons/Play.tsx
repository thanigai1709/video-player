type IconProp = {
	width: string;
	height: string;
	color: string;
};
const Play: React.FC<IconProp> = ({ width = "10px", height = "10px", color = "#000000" }) => {
	return (
		<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
			<path
				fill={color}
				d="M366-232q-15 10-30.5 1T320-258v-450q0-18 15.5-27t30.5 1l354 226q14 9 14 25t-14 25L366-232Z"
			/>
		</svg>
	);
};

export default Play;
