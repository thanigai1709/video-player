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
		case "pause":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M615-200q-24.75 0-42.375-17.625T555-260v-440q0-24.75 17.625-42.375T615-760h55q24.75 0 42.375 17.625T730-700v440q0 24.75-17.625 42.375T670-200h-55Zm-325 0q-24.75 0-42.375-17.625T230-260v-440q0-24.75 17.625-42.375T290-760h55q24.75 0 42.375 17.625T405-700v440q0 24.75-17.625 42.375T345-200h-55Z"
					/>
				</svg>
			);
		case "play":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M366-232q-15 10-30.5 1T320-258v-450q0-18 15.5-27t30.5 1l354 226q14 9 14 25t-14 25L366-232Z"
					/>
				</svg>
			);
		case "playback-speed":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M166-234q-38-45-59.5-100.5T81-450h62q5 47 22 91t47 80l-46 45ZM81-530q2-60 24.5-115T166-746l46 45q-29 38-46.5 81T143-530H81ZM441-89q-59-8-114-28t-102-55l46-48q38 26 81 44.5t89 26.5v60ZM273-760l-48-48q48-36 103.5-55.5T444-891v60q-47 8-90 25.5T273-760Zm114 441v-342l268 171-268 171ZM524-89v-60q128-19 212-115.5T820-490q0-129-84-225.5T524-831v-60q154 15 255 130.5T880-490q0 155-101 270T524-89Z"
					/>
				</svg>
			);
		case "fullscreen-exit":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M362.825-200Q350-200 341.5-208.625T333-230v-103H230q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-393h133q12.75 0 21.375 8.625T393-363v133q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM230-567q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230-627h103v-103q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T393-730v133q0 12.75-8.625 21.375T363-567H230Zm366.825 367Q584-200 575.5-208.625T567-230v-133q0-12.75 8.625-21.375T597-393h133q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-333H627v103q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM597-567q-12.75 0-21.375-8.625T567-597v-133q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T627-730v103h103q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730-567H597Z"
					/>
				</svg>
			);
		case "fullscreen":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M230-200q-12.75 0-21.375-8.625T200-230v-133q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T260-363v103h103q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T363-200H230Zm-.175-367Q217-567 208.5-575.625T200-597v-133q0-12.75 8.625-21.375T230-760h133q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T363-700H260v103q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM597-200q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T597-260h103v-103q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T760-363v133q0 12.75-8.625 21.375T730-200H597Zm132.825-367Q717-567 708.5-575.625T700-597v-103H597q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T597-760h133q12.75 0 21.375 8.625T760-730v133q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Z"
					/>
				</svg>
			);
		case "repeat":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M700-270v-130q0-13 8.5-21.5T730-430q13 0 21.5 8.5T760-401v161q0 13-8.5 21.5T730-210H236l64 64q10 10 10 22.5t-9 21.5q-9 9-21 9.5t-21-8.5L141-219q-9-9-9-21t9-21l117-117q9-9 21.5-9t21.5 9q9 9 9 21.5t-9 21.5l-65 65h464ZM260-690v130q0 13-8.5 21.5T230-530q-13 0-21.5-8.5T200-559v-161q0-13 8.5-21.5T230-750h494l-64-64q-9-9-9.5-22t8.5-22q9-9 21-9.5t21 8.5l118 118q9 9 9 21t-9 21L702-582q-9 9-21.5 9t-21.5-9q-9-9-9-21.5t9-21.5l65-65H260Z"
					/>
				</svg>
			);
		case "paint":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-84 32-157t87.5-127q55.5-54 130-85T489-880q79 0 150 26.5T763.5-780q53.5 47 85 111.5T880-527q0 108-63 170.5T650-294h-75q-18 0-31 14t-13 31q0 20 14.5 38t14.5 43q0 26-24.5 57T480-80ZM247-454q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm126-170q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm214 0q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Zm131 170q20 0 35-15t15-35q0-20-15-35t-35-15q-20 0-35 15t-15 35q0 20 15 35t35 15Z"
					/>
				</svg>
			);
		case "pen":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M215-117q-34 0-67-11.5T90-166q35-12 50-35t15-62q0-44 30.5-74.5T260-368q44 0 74.5 30.5T365-263q0 64-43.5 105T215-117Zm230-237-90-95 376-376q14-14 31-14.5t32 14.5l29 29q15 15 14.5 32.5T823-732L445-354Z"
					/>
				</svg>
			);
		case "rect":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M180-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h600q24 0 42 18t18 42v520q0 24-18 42t-42 18H180Zm0-60h600v-520H180v520Zm0 0v-520 520Z"
					/>
				</svg>
			);
		case "line":
			return (
				<svg width={width} height={height} className={name} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
					<path
						fill={color}
						d="M212-212q-9-9-9-21t9-21l494-494q8-8 20.5-8.5T748-748q9 9 9 21t-9 21L254-212q-9 9-21 9t-21-9Z"
					/>
				</svg>
			);
		default:
			return null;
	}
};

export default Icon;
