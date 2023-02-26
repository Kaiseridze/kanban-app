import { FC } from 'react';
import { ImCross } from 'react-icons/im';

import styles from './boardCard.module.scss';
import { IBoardCard } from './BoardCard.types';

const BoardCard: FC<IBoardCard> = ({ title, onRemove, onEdit }) => {
	return (
		<div className={styles.boardCard}>
			<h3 className={styles.boardCardTitle}>{title}</h3>
			<div className={styles.boardCardIcons}>
				<ImCross className={styles.boardCardRemove} onClick={onRemove} />
			</div>
		</div>
	);
};

export default BoardCard;
