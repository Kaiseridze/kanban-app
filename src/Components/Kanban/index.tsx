import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";

import { fetchProjectById } from "../../API/ProjectAPI";
import { createBoard, fetchBoards, removeBoard } from "../../API/BoardsAPI";

import { IBoardModel, IProjectModel } from "../../Models";
import { Loader, Button } from "../../UI";
import { BoardCard } from "../../Components";

import styles from "./kanban.module.scss";
import { createTask } from "../../API/TaskAPI";

const Kanban = () => {
    const [project, setProject] = useState<IProjectModel>();
    const [boards, setBoards] = useState<IBoardModel[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const { id } = useParams<string>();

    const onFetch = useCallback(() => {
        setPending(true);
        fetchProjectById(id).then((data) => {
            setProject(data);
        });
        fetchBoards(id).then((data) => {
            setBoards(data);
            setPending(false);
        });
    }, [id]);

    useEffect(() => {
        onFetch();
    }, [onFetch]);

    const onRemoveBoard = (id: string) => {
        removeBoard(id);
        const filteredBoards = boards.filter((board) => board._id !== id);
        setBoards(filteredBoards);
    };

    const onCreateBoard = () => {
        createBoard(id).then((data) => setBoards((prev) => [...prev, data]));
    };

    const onCreateTask = (board_id: string) => {
        createTask({board_id: board_id}).then((data) => {
            const updatedBoards = [...boards];
            const currentBoard = updatedBoards.findIndex(
                (board) => board._id === board_id
            );
            updatedBoards[currentBoard]?.tasks?.push(data);
            setBoards(updatedBoards)
        });
    };

    if (pending) return <Loader />;
    return (
        <div className={styles.kanbanWrapper}>
            <div className={styles.kanbanHeader}>
                <h1 className={styles.kanbanHeaderTitle}>{project?.title}</h1>
                <p className={styles.kanbanHeaderDescription}>
                    {project?.description}
                </p>
                <Button
                    className={styles.kanbanHeaderButton}
                    onClick={onCreateBoard}
                    color="white"
                    content="Add new board"
                />
            </div>
            <div className={styles.kanbanSections}>
                <DragDropContext onDragEnd={(result) => console.log(result)}>
                    {boards.map((board) => (
                        <BoardCard
                            key={board._id}
                            tasks={board.tasks}
                            onCreateTask={() => onCreateTask(board._id)}
                            onRemove={() => onRemoveBoard(board._id)}
                            id={board._id}
                            title={board.title}
                        />
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
};

export default Kanban;
