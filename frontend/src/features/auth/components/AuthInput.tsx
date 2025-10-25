interface AuthInputProps {
	label: string;
	name: string,
	type?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
}

const AuthInput = ({ label, name, type = "text", value, onChange, placeholder }: AuthInputProps) => (
	<div className="mb-4">
		<label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
		/>
	</div>
);

export default AuthInput;
