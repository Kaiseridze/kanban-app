import axios from "../axios";

export const createTask = async ({board_id}: {board_id: string}) => {
    const { data } = await axios.post(`/tasks`, {board_id});
    return data;
};
