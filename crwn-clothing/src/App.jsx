import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/navigation/navigation.component.jsx";
import Home from "./routes/home/home.component.jsx";
import SignIn from "./routes/sign-in/sign-in.component.jsx";

function Shop() {
	return <div>I am the shop</div>;
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop" element={<Shop />} />
				<Route path="sign-in" element={<SignIn />} />
			</Route>
		</Routes>
	);
}

export default App;
