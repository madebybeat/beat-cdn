const { createDecipheriv, createHash } = require('crypto');

const cbcKey = 'g4el58wc' + '0zvf9na1';

export class EncryptService {
    async decrypt(buffer: any, key: string): Promise<any> {
        const md5 = createHash('md5')
            .update(key, 'ascii')
            .digest('hex');

        const blowFishKey = (() => {
                let key = '';

                for (let i = 0; i < 16; i++)
                    key += String.fromCharCode(
                        md5.charCodeAt(i) ^ md5.charCodeAt(i + 16) ^ cbcKey.charCodeAt(i),
                    );

                return key;
            })(),
            decrypted = Buffer.alloc(buffer.length);

        let i = 0;
        let position = 0;

        while (position < buffer.length) {
            const chunkSize =
                    buffer.length - position >= 2048 ? 2048 : buffer.length - position,
                chunk = Buffer.alloc(chunkSize);

            (buffer as Buffer).copy(chunk, 0, position, position + chunkSize);

            const chunkString =
                i % 3 || chunkSize < 2048
                    ? chunk.toString('binary')
                    : createDecipheriv(
                        'bf-cbc',
                        blowFishKey,
                        Buffer.from([0, 1, 2, 3, 4, 5, 6, 7]),
                    )
                        .setAutoPadding(false)
                        .update(chunk, 'binary', 'binary')
                        .toString('binary');

            decrypted.write(
                chunkString,
                position,
                chunkString.length,
                'binary',
            );

            position += chunkSize;
            i++;
        }

        return decrypted;
    }
}
