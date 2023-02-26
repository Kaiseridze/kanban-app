export interface IBoardCard {
	title: string;
	id: string
	onEdit?: (id: string, title: string) => void;
	onRemove: React.MouseEventHandler<SVGElement>;
}
