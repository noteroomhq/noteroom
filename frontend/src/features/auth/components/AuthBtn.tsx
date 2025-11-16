const AuthButton = ({ label, onClick, disabled=false }: { label: string; onClick?: (e: React.FormEvent) => void, disabled?: boolean}) => (
	<button
		onClick={onClick}
		className={"w-full text-white uppercase py-2 rounded-full transition cursor-pointer " + (disabled ? "cursor-not-allowed bg-gray-300" : "bg-[#42ACDE] hover:bg-[#3F8FB5]")}
		disabled={disabled}
	>
		{label}
	</button>
);

export default AuthButton;
