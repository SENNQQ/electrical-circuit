export type TChoice = {
    name: string
    title: string
}

export type TSchema = {
    department: string
    schemas: TChoice[]
}

export type TStudent = {
    id: number
    name: string
    group: string
    schema: string
    attempt: number
    file: string[]
    createdAt: string
    updatedAt: string
}
