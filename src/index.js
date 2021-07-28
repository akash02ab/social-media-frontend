import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PostContextProvider } from "./contexts/PostContext";
import { UsersContextProvider } from "./contexts/UsersContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
	<ChakraProvider>
		<AuthContextProvider>
			<UsersContextProvider>
				<PostContextProvider>
					<App />
				</PostContextProvider>
			</UsersContextProvider>
		</AuthContextProvider>
	</ChakraProvider>,
	document.getElementById("root")
);
