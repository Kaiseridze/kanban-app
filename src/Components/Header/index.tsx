import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import styles from './header.module.scss';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Header = () => {
	const location = useLocation();
	return (
		<header className={styles.header}>
			{location.pathname !== '/' && (
				<Link to='/'>
					<span className={styles.back}>
						<AiOutlineArrowLeft className={styles.arrowIcon} />
						Back
					</span>
				</Link>
			)}
		</header>
	);
};

export default Header;
