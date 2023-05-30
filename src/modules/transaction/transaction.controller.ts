import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Permission } from 'src/decorators/permission.decorator';
import { TransactionService } from './transaction.service';
import { CreatetransactionDto } from './dto/create-transaction.dto';
import { UpdatetransactionDto } from './dto/update-transaction.dto';
import genPayload,{stamp,ACTIONTYPE,ForbiddenException} from 'src/utils/payload';
// import actio
const route = 'transaction';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // @Post()
  // async create(@Body() createDriverDto: any) {
  //   console.log('createDriverDto',createDriverDto)
  //   const data = await this.driverService.create(createDriverDto);
  //   return genPayload(data, null, ACTIONTYPE.CREATE);
  // }

  @Get()
  @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลการทำธุรกรรมทั้งหมด' })
  findAll(@Body() body: any) {
    return this.transactionService.findAll(body);
  }

  @Get('option')
  // @Permission({ route: route, action: 'view' })
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลoptionการทำธุรกรรมทั้งหมด' })
  findOptiontype() {
    return this.transactionService.findOptiontype();
  }

 

  @Get(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'ดึงข้อมูลการทำธุรกรรมรายid' })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดตข้อมูลการทำธุรกรรม' })
 async update( @Body() updatetransactionDto: any) {
    console.log('updateController',updatetransactionDto)
   const data = await this.transactionService.update(updatetransactionDto);
    return genPayload(data, null, ACTIONTYPE.UPDATE);
  }

  @Patch('status')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'อัพเดตข้อมูลstatusการทำธุรกรรม' })
  async updatestatus( @Body() updatetransactionDto: any) {
     console.log('updateController',updatetransactionDto)
    const data = await this.transactionService.updatestatus(updatetransactionDto);
     return genPayload(data, null, ACTIONTYPE.UPDATE);
   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.driverService.remove(+id);
//   }
 }
