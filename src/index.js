import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { PostContextProvider } from "./contexts/PostContext";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
	<AuthContextProvider>
		<PostContextProvider>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</PostContextProvider>
	</AuthContextProvider>,
	document.getElementById("root")
);
