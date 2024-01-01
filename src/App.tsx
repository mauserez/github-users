//import { useState } from "react";
import s from "./App.module.css";
import Github from "./components/github/Github";
import { Route, Routes } from "react-router-dom";
import LinkMenu from "./shared/LinkMenu";

const links = [
	{ name: "Home", path: "/" },
	{ name: "Github", path: "/github" },
];

function App() {
	return (
		<section className={s.wrap}>
			<header className={`${s.header} text-4xl`}>
				Hello guests. Let's go.
			</header>
			<main className={`container ${s.main}`}>
				<LinkMenu className={s.menu} links={links} />
				<div className={s.content}>
					<Routes>
						<Route element={<div>Main</div>} path="/"></Route>
						<Route element={<Github />} path="/github"></Route>
					</Routes>
				</div>
			</main>
			<footer>
				<LinkMenu className={s.menu} links={links} />
			</footer>
		</section>
	);
}

export default App;
