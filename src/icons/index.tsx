interface IconsProps {
	width: string;
	height: string;
	color: string;
	name: string;
}

const Icon: React.FC<IconsProps> = ({ width, height, color, name }) => {
	switch (name) {
		case "timer":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="m627-287 45-45-159-160v-201h-60v225l174 181ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-82 31.5-155t86-127.5Q252-817 325-848.5T480-880q82 0 155 31.5t127.5 86Q817-708 848.5-635T880-480q0 82-31.5 155t-86 127.5Q708-143 635-111.5T480-80Zm0-400Zm0 340q140 0 240-100t100-240q0-140-100-240T480-820q-140 0-240 100T140-480q0 140 100 240t240 100Z"
					/>
				</svg>
			);
		case "checkbox--checked":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="m419-321 289-290-43-43-246 247-119-119-43 43 162 162ZM180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Z"
					/>
				</svg>
			);
		case "checkbox--unchecked":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600v-600H180v600Z"
					/>
				</svg>
			);
		case "comments":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M240-400h480v-60H240v60Zm0-130h480v-60H240v60Zm0-130h480v-60H240v60ZM140-240q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v740L720-240H140Z"
					/>
				</svg>
			);
		case "thumbsup":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M721-120H254v-512l278-288 33 26q11 8 14.5 18t3.5 23v10l-45 211h322q23 0 41.5 18.5T920-572v82q0 11-2.5 25.5T910-439L794-171q-9 21-29.5 36T721-120ZM194-632v512H80v-512h114Z"
					/>
				</svg>
			);
		case "trash":
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className={name} width={width} height={height} viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z"
					/>
				</svg>
			);
		default:
			return null;
	}
};

export default Icon;
