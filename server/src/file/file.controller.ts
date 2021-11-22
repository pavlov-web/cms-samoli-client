import { Controller, Post, HttpCode, UseInterceptors, UseGuards, UploadedFile } from '@nestjs/common';
import { FileService, MFile } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileElementsResponse } from './dto/file.dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  @UseGuards(JwtAuthGuard)
  async upload(@UploadedFile() file: Express.Multer.File): Promise<FileElementsResponse[]> {
    const sizes = [1024, 768, 568, 100]
    const saveArray: MFile[] = [new MFile(file)];

    if(file.mimetype.includes('image')) {
      const buffer = await this.fileService.convertToWebP(file.buffer)

      for(const size of sizes) {
        const bufferResize = await this.fileService.resizeImage(file.buffer, size)
        const bufferResizeWebP = await this.fileService.resizeImage(buffer, size)

        saveArray.push({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer: buffer
        },{
          originalname: `${file.originalname.split('.')[0]}_${size}.${file.originalname.split('.')[1]}`,
          buffer: bufferResize
        },{
          originalname: `${file.originalname.split('.')[0]}_${size}.webp`,
          buffer: bufferResizeWebP
        })
      }
    }
    return this.fileService.save(saveArray);
  }
}
