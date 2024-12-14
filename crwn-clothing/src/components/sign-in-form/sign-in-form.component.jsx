import { useState } from "react";

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
	email: "",
	password: "",
};

function SignInForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	console.log(formFields);

	const handleChange = (event) => {
		event.preventDefault();

		const { value, name } = event.target;

		setFormFields((prevFormFields) => ({
			...prevFormFields,
			[name]: value,
		}));
	};

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		await createUserDocumentFromAuth(user);
	};

	return (
		<div className="sign-up-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email an password</span>
			<form onSubmit={() => {}}>
				<FormInput
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					required
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					required
				/>

				<Button type="submit">Sign up</Button>
				<Button buttonType="google" onClick={logGoogleUser}>
					Sign in with Google
				</Button>
			</form>
		</div>
	);
}

export default SignInForm;
