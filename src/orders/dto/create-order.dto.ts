import { IsString, Length, IsNotEmpty, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsNotEmpty()
  dateId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  descr: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  specialty: string;
}
