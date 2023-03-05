import { ITaskModel } from "../../Models";

export interface IBoardCard {
	title: string;
	id: string
	tasks?: ITaskModel[]
	onEdit?: (id: string, title: string) => void;
	onRemove: React.MouseEventHandler<SVGElement>;
}
