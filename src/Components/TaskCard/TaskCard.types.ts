import {
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";

export interface ITaskCard {
    title: string;
    reference: React.Ref<HTMLLIElement>;
    draggableProps?: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}
