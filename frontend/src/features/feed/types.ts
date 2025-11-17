/* Media Type Post (Upload) */
export type TMediaPost = { 
	url: string,
	id: number
}
export enum Direction {
	Previous = -1,
	Next = 1
}

export type TMoveMedia = (direction: Direction) => void
export type TRemoveMedia = (id: number, isLast: boolean) => void



/* Poll Type Post (Upload) */
export type TPollPost = {
	id: number,
	value: string
}
export type TAddPollOption = () => void
export type TRemovePollOption = (id: number) => void
export type TSetPollValue = (id: number, value: string) => void


export type TTools = { media: boolean, poll: boolean }
export type TOpenCloseTool = (tool: keyof TTools, action?: 'open' | 'close', toggle?: boolean) => void
