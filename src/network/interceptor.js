import axios from "axios";

const getNewToken = async () => {
	let localData = JSON.parse(localStorage.getItem("social-media"));

	const response = await axios.post("/auth/token", { refresh_token: localData.refresh_token });
	localData.access_token = response.data.access_token;
	localStorage.setItem("social-media", JSON.stringify(localData));
};

export default function networkInterceptor(history) {
	// axios.defaults.baseURL = "http://localhost:8080/";
	axios.defaults.baseURL = "https://socia-media-api.herokuapp.com/";

	axios.interceptors.request.use(
		function (req) {
			let localData = JSON.parse(localStorage.getItem("social-media"));
			let access_token = null;

			if (localData) {
				access_token = localData.access_token;
			}

			if (!access_token) {
				console.log("Token not found");
			} else {
				req.headers["authorization"] = "Bearer " + access_token;
			}
			return req;
		},

		function (error) {
			return Promise.reject(error);
		}
	);

	axios.interceptors.response.use(
		function (res) {
			return res;
		},

		async function (error) {
			const originalRequest = error.config;

			let { status } = error.response;
			let localData = JSON.parse(localStorage.getItem("social-media"));
			let access_token = null;

			if (localData) {
				access_token = localData.access_token;
			}
			if (status === 401 && access_token && !originalRequest._retry) {
				originalRequest._retry = true;
				await getNewToken();
				return axios(originalRequest);
			}

			if (status === 403 || status === 400) {
				history.replace("/login");
			}
			return Promise.reject(error);
		}
	);
}
