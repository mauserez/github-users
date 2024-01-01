import axios from "axios";
const token = import.meta.env.VITE_GITHUB_API_TOKEN;

axios.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { axios as githubAxios };
