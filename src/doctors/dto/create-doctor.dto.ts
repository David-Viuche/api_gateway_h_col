import { IsString, IsEmail, Length, IsNumberString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @IsNumberString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 90)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 90)
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Length(1, 200)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 90)
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  profCard: string;


  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  admiDate: Date;
}
