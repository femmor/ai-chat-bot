export type Message = {
    type: string
    text: string
    timestamp: string
}

export type Chat = {
    id: string,
    displayId: string,
    messages: Message[]
}
