import axios from '../axios';

export const fetchProjects = async () => {
	const { data } = await axios.get('/projects');
	return data;
};

export const removeProject = async (id: string) => {
	await axios.delete(`/projects/${id}`);
};

export const createProject = async () => {
	const { data } = await axios.post('/projects');
	return data;
};
