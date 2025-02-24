import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, ParseDatePipe, UseInterceptors, UploadedFile, BadRequestException, UseGuards } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { MongoIdPipe } from 'src/mongo-id/mongo-id.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guard/auth/auth.guard';
// import { diskStorage } from 'multer';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Post()
  @UseGuards(AuthGuard)
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
    const newBill = this.billService.create(bill, createBillDto);

    return newBill;
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.billService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(id, updateBillDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.billService.remove(id);
  }
}
