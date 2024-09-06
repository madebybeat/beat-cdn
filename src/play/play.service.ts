import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PassThrough } from 'stream';
import { EncryptService } from "../encrypt/encrypt.service";

@Injectable()
export class PlayService {
    constructor(
        private readonly encryptService: EncryptService
    ) {}

    async load(url: string, key: string): Promise<any> {
        const { data } = await axios({ url, responseType: 'arraybuffer' });

        const decrypted = await this.encryptService.decrypt(Buffer.from(data), key);

        const stream = new PassThrough();

        stream.end(decrypted);

        return stream;
    }
}
