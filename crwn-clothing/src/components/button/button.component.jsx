/* eslint-disable react/prop-types */
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

function Button({ children, buttonType, ...rest }) {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...rest}
		>
			{children}
		</button>
	);
}

export default Button;
