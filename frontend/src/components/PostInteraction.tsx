import React from "react";

export default function PostInteraction({ name, value, children }: { name: string, value: string, children: React.ReactElement<any> }) {
	return (
		<div className={`${name} flex items-center gap-1`}>
			{React.cloneElement(children, {
				className: 'w-[24px] h-[24px]'
			})}
			<span>{value}</span>
		</div>
	)
}
