import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProjectById } from '../../API/ProjectAPI';
import { IProjectModel } from '../../Models';
import { Loader } from '../../UI';

import styles from './kanban.module.scss';

const Kanban = () => {
	const [data, setData] = useState<IProjectModel>();
	const [pending, setPending] = useState<boolean>(false);
	const { id } = useParams<string>();

	const onFetch = () => {
		setPending(true);
		fetchProjectById(id).then((data) => {
			setPending(false);
			setData(data);
		});
	};
	useEffect(() => {
		onFetch();
	}, []);

	if (pending) return <Loader />;
	return (
		<div className={styles.kanbanHeader}>
			<h1 className={styles.kanbanHeaderTitle}>{data?.title}</h1>
			<p className={styles.kanbanHeaderDescription}>{data?.description}</p>
		</div>
	);
};

export default Kanban;
