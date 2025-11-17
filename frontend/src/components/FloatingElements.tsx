import { createPortal } from "react-dom";

export default function FloatingElements({ children }: { children: React.ReactNode | React.ReactNode[] }) {
	return (
		createPortal(
			<div className="floating-elements fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
				{ children }
			</div>,
			document.getElementById("portal") as HTMLElement
		)
	)
}
