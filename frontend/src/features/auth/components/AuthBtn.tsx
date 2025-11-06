const AuthButton = ({ label, onClick, disabled=false }: { label: string; onClick?: (e: React.FormEvent) => void, disabled?: boolean}) => (
	<button
		onClick={onClick}
		className={"w-full text-white py-2 rounded-lg transition " + (disabled ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 hover:bg-blue-700")}
		disabled={disabled}
	>
		{label}
	</button>
);

export default AuthButton;
