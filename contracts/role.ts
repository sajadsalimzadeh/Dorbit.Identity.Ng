import { FullEntity } from "@framework/contracts";

export interface Role extends FullEntity {
    id: string;
    name: string;
    description: string;
    accessibility: string[];
}