import React from 'react'

export default function Backdrop({ zIndex, onClick }: { zIndex: number, onClick?: (e?: React.MouseEvent) => void }) {
    return <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-${zIndex}`} onClick={onClick} />
}
