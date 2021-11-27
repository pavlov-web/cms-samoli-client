import { Injectable } from '@nestjs/common';
import { FileElementsResponse } from './dto/file.dto';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';

@Injectable()
export class FileService {
  async save(files: MFile[]): Promise<FileElementsResponse[]> {
    const folder = `${path}/uploads/images`;
    await ensureDir(folder);

    const res: FileElementsResponse[] = [];
    for (const file of files) {
      await writeFile(`${folder}/${file.originalname}`, file.buffer);
      res.push({
        url: `${folder}/${file.originalname}`,
        name: file.originalname,
      });
    }
    return res;
  }

  resizeImage(file: Buffer, size: number): Promise<Buffer> {
    return sharp(file).resize({ width: size }).toBuffer();
  }

  convertToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).webp().toBuffer();
  }
}

export class MFile {
  originalname: string;
  buffer: Buffer;

  constructor(file: Express.Multer.File | MFile) {
    this.originalname = file.originalname;
    this.buffer = file.buffer;
  }
}
