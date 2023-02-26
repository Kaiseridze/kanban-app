export interface ITextField {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
    className?: string
	color?: "white" | "black"
}
