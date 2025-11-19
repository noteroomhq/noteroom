import React from "react";

export default function PostInteraction({ name, value, children, onClick }: { name: string, value: string, children: React.ReactElement<any>, onClick?: () => void  }) {
	return (
		<div className={`${name} flex items-center gap-1`} onClick={onClick}>
			{React.cloneElement(children, {
				className: 'w-[24px] h-[24px]'
			})}
			<span>{value}</span>
		</div>
	)
}
