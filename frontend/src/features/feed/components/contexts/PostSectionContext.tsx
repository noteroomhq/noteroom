import type { StateController } from "@stypes/global";
import { createContext, useContext, useEffect, useState } from "react";
import type { TAddPollOption, TMediaPost, TMoveMedia, TOpenCloseTool, TPollPost, TRemoveMedia, TRemovePollOption, TSetPollValue, TTools } from "../../types";
import { Direction } from "../../types"

type TPollPostActions = {
    setValue: TSetPollValue,
    addOption: TAddPollOption,
    removeOption: TRemovePollOption
}
type TMediaPostActions = {
    moveMedia: TMoveMedia,
    removeMedia: TRemoveMedia
}

type TPostSectionContext = {
    tools: [TTools, TOpenCloseTool],
    poll: StateController<TPollPost[]>,
    pollActions: TPollPostActions,
    media: [StateController<TMediaPost[]>, number],
    mediaActions: TMediaPostActions
}

const PostSectionContext = createContext<TPostSectionContext | null>(null)
export default function PostSectionProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    const [media, setMedia] = useState<TMediaPost[]>([])
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [polls, setPolls] = useState<TPollPost[]>([
        { id: Math.floor(Math.random() * 100000000), value: "" },
		{ id: Math.floor(Math.random() * 100000000), value: "" }
    ])
    const [showTools, setShowTools] = useState<TTools>({
		media: false,
		poll: false
	})
    
    const mediaActions: TMediaPostActions = {
        moveMedia(direction: Direction) {
            setActiveIndex(prev => {
                if (prev === media.length - 1 && direction === Direction.Next) {
                    return 0
                } 
                if (prev === 0 && direction === Direction.Previous) {
                    return media.length - 1
                }
                return prev + direction
            })
        },
        
        removeMedia(id: number, isLast: boolean) {
            if (isLast) mediaActions.moveMedia(Direction.Next)

            setMedia(media => {
                return media.filter(m => {
                    if (m.id !== id) {
                        return m
                    } else {
                        URL.revokeObjectURL(m.url)
                    }
                })
            })
        }
    }

    const pollActions: TPollPostActions = {
        addOption() {
		    setPolls(polls => ([...polls, { id: Math.floor(Math.random() * 100000000), value: "" } ]))
        },
        removeOption(id: number) {
            setPolls(polls => {
                return polls.filter(poll => poll.id !== id)
            })
        },
        setValue(id: number, value: string) {
            setPolls(polls => {
                return polls.map(poll => {
                    if (poll.id === id) {
                        return { ...poll, value }
                    }
                    return poll
                })
            })
        }
    }

    const openCloseTool: TOpenCloseTool = (tool: string, action?: "open" | 'close', toggle?: boolean) => {
        setShowTools(tools => {
			return Object.fromEntries(
				Object.entries(tools).map(([key, value]) => [key, key === tool ? toggle ? !value : (action === 'open' ? true : false) : false ])
			) as TTools
		})
    }

    useEffect(() => {
		if (media.length === 0) {
			openCloseTool("media", "close", undefined)
		}
	}, [media])

    return (
        <PostSectionContext value={
            {
                tools: [showTools, openCloseTool],
                media: [[media, setMedia], activeIndex],
                mediaActions: mediaActions,
                poll: [polls, setPolls],
                pollActions: pollActions
            }
        }>
            { children }
        </PostSectionContext>
    )
}


export function usePostSectionContext() {
    return useContext(PostSectionContext)
}
