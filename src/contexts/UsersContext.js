import axios from "axios";
import React, { createContext, useState } from "react";

const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [myProfile, setMyProfile] = useState(null);
	const [userError, setUserError] = useState(null);

	const getMyProfile = async () => {
		try {
			let response = await axios.get("user/");
			const data = await response.data;

			setUserError(null);
			setMyProfile(data);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const getAllUsers = async () => {
		try {
			let response = await axios.get("user/all/");
			const data = await response.data;

			setUserError(null);
			setUsers(data);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	const follow = async (username, index) => {
		try {
			let response = await axios.patch("user/follow", { username });
			const data = await response.data;

			setUserError(null);
			let usersCopy = [...users];
			usersCopy.splice(index, 1, data);
			setUsers(usersCopy);
			let me = { ...myProfile };
			me.following.push(usersCopy[index]._id);
			setMyProfile(me);
		} catch (err) {
			setUserError(err.response.data);
		}
	};

	return (
		<UsersContext.Provider value={{ myProfile, users, userError, getMyProfile, getAllUsers, follow }}>
			{children}
		</UsersContext.Provider>
	);
};

export { UsersContext, UsersContextProvider };
