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

export const updateProject = async (
	id: string,
	{ title, description }: { title: string; description: string }
) => {
	const { data } = await axios.patch(`/projects/${id}`, { title, description });
	return data;
};
