import React, { createContext } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
	const post = (message) => {
		console.log(message + " has uploaded.");
	};

	return <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>;
};

export { PostContext, PostContextProvider };
