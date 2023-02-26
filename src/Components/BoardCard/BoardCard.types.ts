export interface IBoardCard {
	title: string;
	onEdit?: () => {};
	onRemove: React.MouseEventHandler<SVGElement>;
}
