import React, { ButtonHTMLAttributes } from "react";

import s from "./Button.module.scss";
import cn from "classnames";
import { ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: string;
	onClick?: () => void;
	type?: "submit" | "reset" | "button" | undefined;
	children?: ReactNode;
	variant?: string;
	disabled?: boolean;
}

const Button = ({
	size = "medium",
	onClick,
	type = "button",
	variant = "",
	children,
	disabled,
}: IButton) => {
	const myClass = cn(disabled && s.disabled, s.button, s[size], s[variant]);
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type}
			className={myClass}
		>
			{children}
		</button>
	);
};

export default Button;
