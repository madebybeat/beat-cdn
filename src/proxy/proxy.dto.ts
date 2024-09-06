import {IsString, Matches} from "class-validator";

export class ProxyDto {
    @IsString()
    url: string;
}
