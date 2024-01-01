import { ComponentProps } from "react";
import { Link } from "react-router-dom";

type MainMenuLink = { name: string; path: string };
type MainMenuProps = { links: MainMenuLink[] } & ComponentProps<"ul">;

const LinkMenu = (props: MainMenuProps) => {
	const { links, ...otherProps } = props;
	return (
		<ul className={otherProps.className}>
			{links.map((l) => (
				<Link key={l.path} to={l.path}>
					{l.name}
				</Link>
			))}
		</ul>
	);
};

export default LinkMenu;
