import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

import { ICard } from './Card.types';

import styles from './card.module.scss';
import { Button } from '../../UI';

const Card: FC<ICard> = ({ color, title, description, routing, removeable }) => {
	return (
		<div className={`${styles.card} ${styles[color]}`}>
			{removeable && <ImCross className={styles.removeCard} onClick={removeable} />}
			<h1 className={styles.cardTitle}>{title}</h1>
			<p className={styles.cardDescription}>{description}</p>
			{routing && (
				<Link to={routing}>
					<Button className={styles.cardButton} color='black' content='Open' />
				</Link>
			)}
		</div>
	);
};

export default Card;
