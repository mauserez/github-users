import { useState, useEffect } from "react";
import { SearchUserType } from "./Github";
import { githubAxios } from "../../api/github/axiosGithub";
import s from "./Github.module.css";
import { Timer } from "../../shared/Timer";

export type UserType = {
	login: string;
	id: number;
	avatar_url: string;
	followers: number;
	public_repos: number;
};

type GithubDetailsPropsType = {
	selectedUser: SearchUserType | null;
	timerSeconds: number;
};

const GithubDetails = (props: GithubDetailsPropsType) => {
	const { selectedUser } = props;
	const initTimerSeconds = props.timerSeconds;
	const [userDetails, setUserDetails] = useState<UserType | null>(null);
	const [timerSeconds, setTimerSeconds] = useState(initTimerSeconds);

	useEffect(() => {
		console.log("SYNC USER DETAILS");
		if (selectedUser?.login) {
			githubAxios
				.get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
				.then((res) => {
					setTimerSeconds(initTimerSeconds);
					setUserDetails(res.data);
				});
		}
	}, [selectedUser, initTimerSeconds]);

	return (
		userDetails &&
		timerSeconds > 0 && (
			<>
				<Timer
					timerKey={userDetails.id}
					seconds={timerSeconds}
					onTimerChange={setTimerSeconds}
				/>

				<div className={s.detailsWrap}>
					<div className={s.detailsUserTitle}>
						{userDetails?.login}
						<div
							style={{ backgroundImage: `url(${userDetails?.avatar_url})` }}
							className={s.userAvatar}
						></div>
					</div>
					<div>
						<div className={s.detailsTitle}>Details</div>
						<div className={s.detailsBody}>
							<div>
								<span>Followers</span>
								<span>{userDetails.followers ?? 0}</span>
							</div>
							<div>
								<span>Repositories</span>
								<span>{userDetails.public_repos ?? 0}</span>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	);
};

export default GithubDetails;
