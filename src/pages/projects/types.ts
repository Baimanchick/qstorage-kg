export namespace ProjectsType {
    export interface Item {
        id: number
        image: string
        title: string
        description: string
        color: string
        warehouse: number
    }
    export interface Form {
        title: string
        description: string
        color: string
        warehouse: number
        image: string
    }

    export interface FormEdit {
        title: string
        description: string
        color: string
        warehouse: number,
        image: string
    }
    export interface ItemDetail {
        id: number;
        image: string;
        title: string;
        description: string;
        color: string;
        warehouse: Warehouse;
    }
    export interface Worker {
        uuid: string;
        first_name: string;
        last_name: string;
        surname: string | null;
    }

    export interface Warehouse {
        id: number;
        title: string;
        image: string;
        color: string;
        address: string | null;
        workers: Worker[];
    }

}
