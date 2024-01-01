import { useEffect, useState } from "react";

type TimerProps = {
	seconds: number;
	onTimerChange: (actualSeconds: number) => void;
	timerKey: string | number;
};

export const Timer = (props: TimerProps) => {
	const { onTimerChange } = props;
	const [timer, setTimer] = useState(props.seconds);

	useEffect(() => {
		setTimer(props.seconds);
	}, [props.seconds]);

	useEffect(() => {
		onTimerChange(timer);
	}, [timer, onTimerChange]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [props.timerKey]);

	return timer;
};
