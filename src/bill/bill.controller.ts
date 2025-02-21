import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseDatePipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Post()
  @UseInterceptors(FileInterceptor('bill', {
    dest: 'files',
    // storage: diskStorage({
      
    // }),
    limits: {
      fileSize: 2000000,
    },
    fileFilter(req, file, callback) {
      if (!/pdf|image/i.test(file.mimetype))
        callback(new BadRequestException(`File is not is a image or pdf`), false);
      else
        callback(null, true);
    },
  }))
  create(
    @UploadedFile() bill: Express.Multer.File,
    @Body() createBillDto: CreateBillDto
  ) {
    return this.billService.create(bill, createBillDto);
  }

  @Get('user/:userId')
  findAllByUserId(
    @Param('userId', MongoIdPipe) userId: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('initialDate') initialDate: string,
    @Query('finalDate') finalDate: string,
  ) {
    return this.billService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
