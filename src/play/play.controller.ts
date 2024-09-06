import {Controller, Get, Res, Query} from '@nestjs/common';
import { Response } from 'express';
import {PlayService} from "./play.service";
import {PlayDto} from "./play.dto";

@Controller('play')
export class PlayController {
    constructor(
        private readonly playService: PlayService
    ) {}

    @Get()
    async play(@Res() response: Response, @Query() playDto: PlayDto) {
        const stream = await this.playService.load(playDto.url, playDto.key);

        stream.pipe(response);
    }
}
