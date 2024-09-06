import { Module } from '@nestjs/common';
import {PlayModule} from "./play/play.module";

@Module({
  imports: [PlayModule],
  providers: []
})
export class AppModule {}
