export interface User {
    id: BigInt,
    username: string,
    password: string,
    created_at: string,
    deleted_at: string,
    updated_at: string | null
}