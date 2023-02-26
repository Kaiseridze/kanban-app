import { FC } from 'react';
import { ITextField } from './TextField.types';

import styles from './textfield.module.scss';

const TextField: FC<ITextField> = ({ onChange, value, className, color = 'white' }) => {
	return (
		<input
			className={`${styles.textfield} ${styles[color]} ${className} `}
			onChange={onChange}
			value={value}
			type='text'
		/>
	);
};

export default TextField;
