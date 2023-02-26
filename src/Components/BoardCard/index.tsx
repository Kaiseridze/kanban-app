import { FC, useState } from 'react';

import { ImCross } from 'react-icons/im';
import { MdEdit } from 'react-icons/md';

import styles from './boardCard.module.scss';

import { IBoardCard } from './BoardCard.types';
import { TextField } from '../../UI';

import { updateBoard } from '../../API/BoardsAPI';

const BoardCard: FC<IBoardCard> = ({ title, onRemove, id }) => {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [updatedTitle, setUpdatedTitle] = useState<string>(title);

	const onEditTitle = () => {
		const form = {
			title: updatedTitle,
		};
		if (isEdit) {
			updateBoard(id, form);
		}
		setIsEdit(!isEdit);
	};

	const onChangeUpdatedTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUpdatedTitle(e.target.value);
	};

	return (
		<div className={styles.boardCard}>
			{isEdit ? (
				<TextField onChange={onChangeUpdatedTitle} value={updatedTitle} />
			) : (
				<h3 className={styles.boardCardTitle}>{updatedTitle}</h3>
			)}
			<div className={styles.boardCardIcons}>
				<MdEdit
					onClick={onEditTitle}
					className={
						isEdit ? `${styles.boardCardEditActive}` : `${styles.boardCardEdit}`
					}
				/>
				<ImCross className={styles.boardCardRemove} onClick={onRemove} />
			</div>
		</div>
	);
};

export default BoardCard;
