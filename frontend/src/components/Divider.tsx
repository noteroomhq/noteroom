export default function Divider({ extendedClass }: { extendedClass?: string }) {
	return (
		<div className={`w-[90%] h-px bg-gray-300 md:w-full ${extendedClass}`}></div>
	)
}
