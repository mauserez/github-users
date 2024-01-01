import { useState, useEffect } from "react";
import s from "./Github.module.css";
import { SearchUserType } from "./Github";
import { githubAxios } from "../../api/github/axiosGithub";

type GithubUsersPropsType = {
	search: string;
	selectedUser: SearchUserType | null;
	onUserSelect: (user: SearchUserType) => void;
	setIsShow: (isShow: boolean) => void;
	isShow: boolean;
};

export type SearchResult = {
	items: SearchUserType[];
};

function GithubUsers(props: GithubUsersPropsType) {
	const { search, selectedUser, onUserSelect, setIsShow, isShow } = props;
	const [users, setUsers] = useState<SearchUserType[]>([]);

	useEffect(() => {
		console.log("SYNC USERS");
		githubAxios
			.get<SearchResult>(`https://api.github.com/search/users?q=${search}`)
			.then((res) => {
				setUsers(res.data.items);
				setIsShow(true);
			});
	}, [search, setIsShow]);

	return isShow ? (
		<ul className={s.usersList}>
			{users.map((u) => (
				<li
					key={u.id}
					className={selectedUser === u ? s.selected : ""}
					onClick={() => {
						onUserSelect(u);
					}}
				>
					{u.login}
				</li>
			))}
		</ul>
	) : (
		<button type="button" className="bg-indigo-500 ..." disabled>
			loading...
		</button>
	);
}

export default GithubUsers;
