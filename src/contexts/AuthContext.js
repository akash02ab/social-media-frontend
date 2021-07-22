import React, { createContext, useState, useRef } from "react";

const URL = "http://localhost:8080/auth/";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const inputRef = useRef({
		username: "",
		email: "",
		password: "",
		repassword: "",
	});

	const login = async () => {
		const response = await fetch(URL + "signin", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: inputRef.current.username.value,
				password: inputRef.current.password.value,
			}),
		});

		const data = await response.json();

		if (response.status === 200) {
			setError(null);
			setUser(data);
			localStorage.setItem("social-media", JSON.stringify(data));
		} else {
			setSuccess(null);
			setError(data);
		}
	};

	const signup = async () => {
		let formData = new FormData();
		formData.append("username", inputRef.current.username.value);
		formData.append("email", inputRef.current.email.value);
		formData.append("password", inputRef.current.password.value);
		formData.append("repassword", inputRef.current.repassword.value);

		if (avatar) {
			formData.append("avatar", avatar);
		}

		const response = await fetch(URL + "signup", {
			method: "POST",
			mode: "cors",
			body: formData,
		});

		const data = await response.json();

		if (response.status === 200) {
			setError(null);
			setSuccess("Successful.");
		} else {
			setSuccess(null);
			setError(data);
		}
	};

	const logout = async () => {
		let { id } = JSON.parse(localStorage.getItem("social-media"));

		const response = await fetch(URL + "signout", {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		});

		const data = await response.json();

		if (response.status === 200) {
			localStorage.removeItem("social-media");
			setUser(null);
		} else {
			console.log(data);
		}
	};

	const getCurrentlySignedInUser = () => {
		let user = localStorage.getItem("social-media");
		setUser(user);
	};

	return (
		<AuthContext.Provider
			value={{ login, signup, logout, getCurrentlySignedInUser, inputRef, user, success, error, setAvatar }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthContextProvider };
