import { useState, useEffect } from "react";
import s from "./Github.module.css";
import GithubSearchUser from "./GithubSearchUser";
import GithubUsers from "./GithubUsers";
import GithubDetails from "./GithubDetails";

export type GithubPropsType = {
	defaultSearch?: string;
};

export type SearchUserType = {
	login: string;
	id: number;
};

export const Github = ({ defaultSearch = "mauserez" }: GithubPropsType) => {
	const [search, setSearch] = useState(defaultSearch);
	const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
	const [reset, setReset] = useState(false);
	const [usersShow, setUsersShow] = useState(false);

	useEffect(() => {
		console.log("SYNC DOC TITLE");
		if (selectedUser?.login) {
			document.title = selectedUser.login;
		}
	}, [selectedUser]);

	useEffect(() => {
		setUsersShow(false);
	}, [search]);

	return (
		<div className={s.container}>
			<div className={s.searchWrap}>
				<GithubSearchUser
					onReset={() => {
						setReset(false);
					}}
					reset={reset}
					value={search}
					onSubmit={setSearch}
				/>
				<button
					onClick={() => {
						setSearch(defaultSearch);
						setReset(true);
					}}
				>
					Reset
				</button>

				<GithubUsers
					isShow={usersShow}
					setIsShow={() => {
						setUsersShow(true);
					}}
					search={search}
					selectedUser={selectedUser}
					onUserSelect={setSelectedUser}
				/>
			</div>
			<GithubDetails timerSeconds={5} selectedUser={selectedUser} />
		</div>
	);
};

export default Github;
