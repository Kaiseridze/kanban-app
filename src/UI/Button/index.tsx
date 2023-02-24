import { FC } from 'react';
import { IButton } from './Button.types';

import styles from './button.module.scss';

const Button: FC<IButton> = ({ content, color, onClick, className }) => {
	return (
		<button onClick={onClick} className={`${styles.button} ${styles[color]} ${className}`}>
			{content}
		</button>
	);
};

export default Button;
