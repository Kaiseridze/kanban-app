import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProjectById } from '../../API/ProjectAPI';
import { IProjectModel } from '../../Models';

import styles from './kanban.module.scss';

const Kanban = () => {
	const [data, setData] = useState<IProjectModel>();
	const { id } = useParams<string>();

	const onFetch = () => {
		fetchProjectById(id).then((data) => setData(data));
	};
	useEffect(() => {
		onFetch();
	}, []);
	return (
		<div className={styles.kanban}>
			<h1>{data?.title}</h1>
			<p>{data?.description}</p>
		</div>
	);
};

export default Kanban;
