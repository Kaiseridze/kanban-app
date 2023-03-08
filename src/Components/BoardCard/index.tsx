import { FC, useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { ImCross } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";

import styles from "./boardCard.module.scss";

import { IBoardCard } from "./BoardCard.types";
import { TextField } from "../../UI";

import { updateBoard } from "../../API/BoardsAPI";

import { useDebounce } from "../../Hooks/useDebounce";
import TaskCard from "../TaskCard";

const BoardCard: FC<IBoardCard> = ({ title, onRemove, id, tasks, onCreateTask }) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [updatedTitle, setUpdatedTitle] = useState<string>("");
    const debouncedValue = useDebounce(updatedTitle, 500);

    const onEditTitle = () => {
        if (!updatedTitle) {
            setUpdatedTitle(title);
        }
        setIsEdit(!isEdit);
    };

    const onChangeUpdatedTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedTitle(e.target.value);
    };

    useEffect(() => {
        if (debouncedValue) {
            updateBoard(id, { title: debouncedValue });
        }
    }, [debouncedValue, id]);

    return (
        <Droppable droppableId={id} key={id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={styles.card}
                >
                    <div className={styles.header}>
                        {isEdit ? (
                            <TextField
                                onChange={onChangeUpdatedTitle}
                                value={updatedTitle}
                                color="white"
                            />
                        ) : (
                            <h3 className={styles.title}>
                                {updatedTitle || title}
                            </h3>
                        )}
                        <div className={styles.icons}>
                            {isEdit ? (
                                <>
                                    <MdEdit
                                        onClick={onEditTitle}
                                        className={styles.editActive}
                                    />
                                </>
                            ) : (
                                <>
                                    <VscAdd onClick={onCreateTask} className={styles.add} />
                                    <MdEdit
                                        onClick={onEditTitle}
                                        className={styles.edit}
                                    />
                                    <ImCross
                                        className={styles.remove}
                                        onClick={onRemove}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <ul>
                        {tasks?.map((task, index) => (
                            <Draggable
                                key={task._id}
                                draggableId={task._id}
                                index={index}
                            >
                                {(provided) => (
                                    <TaskCard
                                        reference={provided.innerRef}
                                        draggableProps={provided.draggableProps}
                                        dragHandleProps={
                                            provided.dragHandleProps
                                        }
                                        title={task.title}
                                    />
                                )}
                            </Draggable>
                        ))}
                    </ul>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default BoardCard;
