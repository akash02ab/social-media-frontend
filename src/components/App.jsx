import { useEffect } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const App = () => {
	const { getCurrentlySignedInUser } = useContext(AuthContext);

	useEffect(() => {
		getCurrentlySignedInUser();
		// eslint-disable-next-line
	}, []);

	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/">
					<Home />
				</PrivateRoute>
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
			</Switch>
		</Router>
	);
};

export default App;

function PrivateRoute({ children, ...rest }) {
	let { user } = useContext(AuthContext);

	return <Route {...rest} render={() => (user ? children : <Redirect to="/login" />)} />;
}
