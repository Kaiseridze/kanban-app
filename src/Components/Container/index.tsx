import { FC } from 'react';

import styles from './container.module.scss';
import { IContainer } from './Container.types';

const Container: FC<IContainer> = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default Container;
