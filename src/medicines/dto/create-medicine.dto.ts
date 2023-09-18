import { IsString, Length, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMedicineDto {

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsNotEmpty()
  orderId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  descr: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  diseases: string;
}
