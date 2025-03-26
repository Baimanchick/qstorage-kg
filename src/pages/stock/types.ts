
export namespace StockType {
    export interface Product {
        image: string;
        slug: string;
        title: string;
        stock: number;
    }

    export interface ApiResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
            total_stock: number;
            products: Product[];
        };
    }
}
