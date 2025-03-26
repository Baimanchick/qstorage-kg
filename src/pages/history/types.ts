export namespace HistoryTypes {
    export interface Item {
        id: number,
        timestamp: string,
        action: string,
        model_name: string,
        object_id: number,
        details: string,
        user: User | null
    }
    export interface ApiResponse {
        count: number
        next: string
        results: Item[]
    }

    export interface User {
        uuid: string,
        avatar: string,
        first_name: string,
        last_name: string,
        surname: string | null,
        email: string
    }
}
