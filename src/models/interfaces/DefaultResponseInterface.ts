import { Medicine } from "@prisma/client";

export interface DefaultResponseInterface {
    message: string;
    statusCode: number;
    data: Medicine;
    total?: number;
    page?: number;
}
