import axios from '../axios';

export const fetchBoards = async (id: string | undefined) => {
	const { data } = await axios.get(`/boards/${id}`);
	return data;
};

export const removeBoard = async (id: string) => {
    await axios.delete(`/boards/${id}`)
}
