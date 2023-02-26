export interface IButton {
	content: string;
	color: 'black' | 'white' 
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}
