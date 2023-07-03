import { KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./Menu.module.css";
import PlayBackSpeed from "../../../../icons/PlayBackSpeed";

interface MenuProps {
	name: string;
	menuItems: MenuItem[];
	defaultValue: MenuItem;
	onChange: (event: MenuItem) => void;
}

interface MenuItem {
	name: string;
	value: string | number;
}

const Menu: React.FC<MenuProps> = (props) => {
	const [selectedOption, setOption] = useState<MenuItem>(props.defaultValue);
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
	const menuContainerRef = useRef<HTMLUListElement>(null);
	const menuGroupContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleClickOutside = (e: MouseEvent) => {
		if (
			menuContainerRef.current &&
			!menuContainerRef.current.contains(e.target as Node) &&
			menuGroupContainerRef.current &&
			!menuGroupContainerRef.current.contains(e.target as Node)
		) {
			setMenuOpen(false);
		}
	};

	const handleMenuSelect = (selectedOption: MenuItem) => {
		setOption(selectedOption);
		props.onChange(selectedOption);
	};

	return (
		<div
			className={styles.menu_group__container}
			role="button"
			ref={menuGroupContainerRef}
			onClick={() => setMenuOpen(!isMenuOpen)}
		>
			<div className={styles.menu_group__active_option} title="Playback Speed">
				{selectedOption.name}
			</div>

			{isMenuOpen && (
				<ul
					className={`${styles.menu_items__container} ${styles.menu_items__container_active}`}
					role="dialog"
					tabIndex={-1}
					ref={menuContainerRef}
				>
					<div className={styles.menu_items__header}>{props.name}</div>
					{props.menuItems.map((m, i) => (
						<li
							key={`menuItem-${i}`}
							className={
								m.value === selectedOption.value
									? `${styles.menu_item} ${styles.menu_item__active}`
									: `${styles.menu_item}`
							}
							onClick={() => handleMenuSelect(m)}
						>
							{m.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Menu;
