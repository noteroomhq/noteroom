import React from "react"
import PostButton from "./PostButton"

function PostSectionTool({ label, children, inAction, onClick }: { label: string, children: React.ReactElement<any>, inAction?: boolean, onClick?: React.MouseEventHandler }) {
	return (
		<div className={`tool gap-0.5 w-full flex items-center p-[5px] cursor-pointer rounded-[10px] ${inAction && 'hover:bg-gray-200'}`} onClick={onClick}>
			{React.cloneElement(children, {
				className: 'h-[20px] w-[20px] min-[2000px]:h-[28px] min-[2000px]:w-[28px]'
			})}
			<span className='text-[14px] min-[2000px]:text-[18px]'>{label}</span>
		</div>
	)
}

export default function PostSectionTools({ extendedClass, inAction = false, actions: [addMedia, addPoll] = [()=>{}, ()=>{}] }: { extendedClass: string, inAction?: boolean, actions?: [()=>void, ()=>void] }) {
	return (
		<div className={`tools ${extendedClass}`}>
			<div className="tools-left 
				gap-[15px] flex items-end
			">
				<PostSectionTool label='Media' inAction={inAction} onClick={() => inAction && addMedia() }>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25V19.75C2 20.99 3.01 22 4.25 22H19.75C20.99 22 22 20.99 22 19.75V4.25C22 3.01 20.99 2 19.75 2ZM4.25 3.5H19.75C20.163 3.5 20.5 3.837 20.5 4.25V13.926L16.642 10.068C16.502 9.928 16.312 9.848 16.112 9.848H16.109C15.909 9.848 15.716 9.928 15.577 10.072L11.26 14.456L9.447 12.65C9.307 12.51 9.117 12.43 8.917 12.43C8.724 12.4 8.522 12.51 8.382 12.657L3.5 17.642V4.25C3.5 3.837 3.837 3.5 4.25 3.5ZM3.506 19.78L8.924 14.246L15.206 20.5H4.25C3.848 20.5 3.523 20.178 3.506 19.78ZM19.75 20.5H17.33L12.323 15.513L16.115 11.663L20.5 16.047V19.75C20.5 20.163 20.163 20.5 19.75 20.5Z" fill="#42ACDE" />
						<path d="M8.86799 9.85097C9.71961 9.85097 10.41 9.16059 10.41 8.30897C10.41 7.45734 9.71961 6.76697 8.86799 6.76697C8.01637 6.76697 7.32599 7.45734 7.32599 8.30897C7.32599 9.16059 8.01637 9.85097 8.86799 9.85097Z" fill="#42ACDE" />
					</svg>
				</PostSectionTool>
				<PostSectionTool label='Poll' inAction={inAction} onClick={() => inAction && addPoll()}>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.222 9.16003H18.888C18.903 9.07003 18.916 8.97803 18.916 8.88303V6.57003C18.916 5.59003 18.119 4.79303 17.138 4.79303H3.5V3.35803C3.5 2.94403 3.164 2.60803 2.75 2.60803C2.336 2.60803 2 2.94403 2 3.35803V20.83C2 21.245 2.336 21.58 2.75 21.58C3.164 21.58 3.5 21.245 3.5 20.83V19.396H14.056C15.036 19.396 15.834 18.599 15.834 17.619V15.306C15.834 15.211 15.82 15.119 15.806 15.028H20.223C21.203 15.028 22.001 14.23 22.001 13.25V10.94C22.001 9.95703 21.204 9.16003 20.223 9.16003H20.222ZM17.14 6.29303C17.292 6.29303 17.417 6.41703 17.417 6.57003V8.88003C17.417 9.03403 17.292 9.16003 17.139 9.16003H3.5V6.29003H17.14V6.29303ZM14.333 15.307V17.619C14.333 17.772 14.208 17.896 14.055 17.896H3.5V15.028H14.056C14.209 15.028 14.333 15.154 14.333 15.308V15.307ZM20.5 13.25C20.5 13.403 20.375 13.527 20.222 13.527H3.5V10.66H20.222C20.375 10.66 20.5 10.784 20.5 10.937V13.25Z" fill="#42ACDE" />
					</svg>
				</PostSectionTool>
				<PostSectionTool label='Event' inAction={inAction} onClick={() => null}>
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_9783_7329)">
							<path d="M-37.9 18C-38 17.9 -38 17.9 -38 17.8C-37.9 17.8 -37.9 17.9 -37.9 18ZM18 2.19998H16.7V1.89998C16.7 1.49998 16.4 1.09998 15.9 1.09998C15.5 1.09998 15.1 1.39998 15.1 1.89998V2.19998H7.7V1.89998C7.7 1.49998 7.4 1.09998 6.9 1.09998C6.5 1.09998 6.1 1.39998 6.1 1.89998V2.19998H4.8C3.4 2.19998 2.3 3.29998 2.3 4.69998V17.8C2.3 19.2 3.4 20.3 4.8 20.3H7.7C8.1 20.3 8.5 20 8.5 19.5C8.5 19.1 8.2 18.7 7.7 18.7H4.8C4.2 18.7 3.8 18.2 3.8 17.7V7.89998C3.8 7.59998 4.2 7.19998 4.8 7.19998H18C18.6 7.19998 19 7.59998 19 7.89998V9.69998C19 10.1 19.3 10.5 19.8 10.5C20.2 10.5 20.6 10.2 20.6 9.69998V4.69998C20.5 3.29998 19.4 2.19998 18 2.19998ZM19 5.89998C18.7 5.79998 18.3 5.69998 18 5.69998H4.8C4.4 5.69998 4.1 5.79998 3.8 5.89998V4.69998C3.8 4.09998 4.3 3.69998 4.8 3.69998H6.1V4.19998C6.1 4.59998 6.4 4.99998 6.9 4.99998C7.3 4.99998 7.7 4.69998 7.7 4.19998V3.69998H15.2V4.19998C15.2 4.59998 15.5 4.99998 16 4.99998C16.4 4.99998 16.8 4.69998 16.8 4.19998V3.69998H18C18.6 3.69998 19 4.19998 19 4.69998V5.89998Z" fill="#42ACDE" />
							<path d="M15.5 10.4C12.1 10.4 9.29999 13.2 9.29999 16.6C9.29999 20 12.1 22.8 15.5 22.8C18.9 22.8 21.7 20 21.7 16.6C21.7 13.2 18.9 10.4 15.5 10.4ZM15.5 21.4C12.9 21.4 10.8 19.3 10.8 16.7C10.8 14.1 12.9 12 15.5 12C18.1 12 20.2 14.1 20.2 16.7C20.2 19.2 18.1 21.4 15.5 21.4Z" fill="#42ACDE" />
							<path d="M18.9 18.7C18.8 18.9 18.5 19.1 18.3 19.1C18.2 19.1 18 19.1 17.9 19L14.8 17V14C14.8 13.6 15.1 13.2 15.6 13.2C16 13.2 16.4 13.5 16.4 14V16.2L18.8 17.7C19 17.9 19.1 18.3 18.9 18.7Z" fill="#42ACDE" />
						</g>
						<defs>
							<clipPath id="clip0_9783_7329">
								<rect width="24" height="24" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</PostSectionTool>
			</div>

			<div className="tools-right
				hidden xl:flex items-end 
			">
				<div className="tool flex items-center justify-center">
					<PostButton onClick={() => inAction && console.log(`upload-post`)} />
				</div>
			</div>
		</div>
	)
}