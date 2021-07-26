import axios from "axios";
import React, { createContext, useState, useRef } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [success, setSuccess] = useState(null);
	const [authError, setAuthError] = useState(null);
	const [user, setUser] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const inputRef = useRef({
		username: "",
		email: "",
		password: "",
		repassword: "",
	});

	const login = async () => {
		if (inputRef.current.username.value === "") {
			setAuthError("Username is required.");
			return;
		}

		if (inputRef.current.password.value === "") {
			setAuthError("Password is required.");
			return;
		}

		try {
			const response = await axios.post("auth/signin/", {
				username: inputRef.current.username.value,
				password: inputRef.current.password.value,
			});

			const data = await response.data;

			setAuthError(null);
			setUser(data);
			localStorage.setItem("social-media", JSON.stringify(data));
		} catch (err) {
			setSuccess(null);
			setAuthError(err.response.data);
		}
	};

	// const signup = async () => {
	// 	for (let key in inputRef.current) {
	// 		if (inputRef.current[key].value === "") {
	// 			console.log("/n/nhere");
	// 			setAuthError(`${key} is required.`);
	// 			return;
	// 		}
	// 	}

	// 	let formData = new FormData();
	// 	formData.append("username", inputRef.current.username.value);
	// 	formData.append("email", inputRef.current.email.value);
	// 	formData.append("password", inputRef.current.password.value);
	// 	formData.append("repassword", inputRef.current.repassword.value);

	// 	if (avatar) {
	// 		formData.append("avatar", avatar);
	// 	}
	// 	console.log(formData);
	// 	try {
	// 		await axios.post("auth/signup/", { data: formData });

	// 		setAuthError(null);
	// 		setSuccess("Successful.");
	// 	} catch (err) {
	// 		setSuccess(null);
	// 		console.log(err.response);
	// 		setAuthError(err.response.data);
	// 	}
	// };

	const signup = async () => {
		for (let key in inputRef.current) {
			if (inputRef.current[key].value === "") {
				setAuthError(`${key} is required.`);
				return;
			}
		}

		let formData = new FormData();
		formData.append("username", inputRef.current.username.value);
		formData.append("email", inputRef.current.email.value);
		formData.append("password", inputRef.current.password.value);
		formData.append("repassword", inputRef.current.repassword.value);

		if (avatar) {
			formData.append("avatar", avatar);
		}

		const response = await fetch("http://localhost:8080/auth/signup", {
			method: "POST",
			mode: "cors",
			body: formData,
		});

		const data = await response.json();

		if (response.status === 200) {
			setAuthError(null);
			setSuccess("Successful.");
		} else {
			setSuccess(null);
			setAuthError(data);
		}
	};

	const logout = async () => {
		let { _id } = JSON.parse(localStorage.getItem("social-media"));

		try {
			await axios.post("auth/signout/", { _id });

			localStorage.removeItem("social-media");

			setAuthError(null);
			setUser(null);
		} catch (err) {
			setAuthError(err.response.data);
		}
	};

	const getCurrentlySignedInUser = () => {
		let user = JSON.parse(localStorage.getItem("social-media"));
		setUser(user);
	};

	return (
		<AuthContext.Provider
			value={{ login, signup, logout, getCurrentlySignedInUser, inputRef, user, success, authError, setAvatar }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
