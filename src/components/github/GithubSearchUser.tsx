import { useEffect, useState } from "react";
import s from "./Github.module.css";

type GithubSearchUserPropsType = {
	onSubmit: (value: string) => void;
	onReset: () => void;
	value: string;
	reset: boolean;
};

const GithubSearchUser = (props: GithubSearchUserPropsType) => {
	const defaultValue = props.value;

	const { onSubmit, onReset, value } = props;
	const [tempSearch, setTempSearch] = useState(value);
	const [reset, setReset] = useState(props.reset);

	useEffect(() => {
		setTempSearch(value);
	}, [value]);

	useEffect(() => {
		if (props.reset !== reset) {
			setTempSearch(defaultValue);
			setReset(props.reset);
		}
	}, [defaultValue, reset, props.reset]);

	return (
		<div className={s.searchInputWrap}>
			<input
				value={tempSearch}
				onKeyDown={(e) => {
					if (e.code === "Enter") {
						const val = e.currentTarget.value;

						if (val) {
							onSubmit(val);
						} else {
							setTempSearch(e.currentTarget.value);
							onSubmit(value);
						}
					}
				}}
				onChange={(e) => {
					setTempSearch(e.currentTarget.value);
					setReset(false);
					onReset();
				}}
				className={s.searchInput}
				placeholder="search"
			/>
			<button
				className={tempSearch === value ? "hidden" : ""}
				onClick={() => {
					onSubmit(tempSearch);
				}}
			>
				Find
			</button>
		</div>
	);
};

export default GithubSearchUser;
