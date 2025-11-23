export default function Divider({ extendedClass }: { extendedClass?: string }) {
	return (
		<div className={`h-px bg-gray-300 w-full ${extendedClass}`}></div>
	)
}
