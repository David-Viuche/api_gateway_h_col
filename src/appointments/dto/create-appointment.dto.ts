import { IsString, Length, IsNotEmpty, IsDateString, IsNumber, Min, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsNotEmpty()
  patientId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @IsNotEmpty()
  doctorId: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  appoDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 3)
  @IsOptional()
  @IsIn(['P', 'A', 'N'])
  state?: string;
}
