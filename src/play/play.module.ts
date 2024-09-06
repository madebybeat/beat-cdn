import { Module } from '@nestjs/common';
import {PlayController} from "./play.controller";
import {PlayService} from "./play.service";
import {EncryptModule} from "../encrypt/encrypt.module";

@Module({
  imports: [
    EncryptModule
  ],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
