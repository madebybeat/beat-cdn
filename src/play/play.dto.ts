import {IsString} from "class-validator";
import {ProxyDto} from "../proxy/proxy.dto";

export class PlayDto extends ProxyDto {
    @IsString()
    key: string;
}
