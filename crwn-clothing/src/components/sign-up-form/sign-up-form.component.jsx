import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

function SignUpForm() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			console.error("Passwords do not match.");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
			console.log(formFields, user);
		} catch (error) {
			switch (error.code) {
				case "auth/email-already-in-use":
					console.error("Cannot create user, email already in use.");
					break;
				case "auth/weak-password":
					console.error("Password should be at least 6 characters");
					break;
				default:
					console.error("Error creating a new user", error.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields((prevFormFields) => ({
			...prevFormFields,
			[name]: value,
		}));
	};

	return (
		<div className="sign-up-container">
			<h2>Don&apos;t have an account?</h2>
			<span>Sign up with your email an password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					required
				/>

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

				<FormInput
					label="Confirm password"
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					required
				/>

				<Button type="submit">Sign up</Button>
			</form>
		</div>
	);
}

export default SignUpForm;
