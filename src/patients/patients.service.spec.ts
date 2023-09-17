import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { PrismaService } from '../database/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsService, PrismaService],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a patient successfully', async () => {
    // Arrange
    const data: CreatePatientDto = {
      id: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York',
    };

    const prismaServiceMock = {
      patient: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(data),
      },
    };

    const patientsService = new PatientsService(prismaServiceMock as any);

    // Act
    const result = await patientsService.create(data);

    // Assert
    expect(result).toEqual(data);
    expect(prismaServiceMock.patient.findUnique).toHaveBeenCalledWith({ where: { id: data.id } });
    expect(prismaServiceMock.patient.create).toHaveBeenCalledWith({ data });
  });

  it('should find all patients successfully', async () => {
    // Arrange
    const patientsData: CreatePatientDto[] = [
      {
        id: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        city: 'New York',
      },
      {
        id: '0987654321',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0987654321',
        address: '456 Elm St',
        city: 'Los Angeles',
      },
    ];

    const prismaServiceMock = {
      patient: {
        findMany: jest.fn().mockResolvedValue(patientsData),
      },
    };

    const patientsService = new PatientsService(prismaServiceMock as any);

    // Act
    const result = await patientsService.findAll();

    // Assert
    expect(result).toEqual(patientsData);
    expect(prismaServiceMock.patient.findMany).toHaveBeenCalled();
  });

  // find one patient successfully
  it('should find one patient successfully', async () => {
    // Arrange
    const patientId = 1;
    const patientData: CreatePatientDto = {
      id: '1234567890',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York',
    };

    const prismaServiceMock = {
      patient: {
        findUnique: jest.fn().mockResolvedValue(patientData),
      },
    };

    const patientsService = new PatientsService(prismaServiceMock as any);

    // Act
    const result = await patientsService.findOne(patientId);

    // Assert
    expect(result).toEqual(patientData);
    expect(prismaServiceMock.patient.findUnique).toHaveBeenCalledWith({ where: { patientId } });
  });

  // throw an error if a patient with the given ID was not found when finding one patient
  it('should throw an error if a patient with the given ID was not found when finding one patient', async () => {
    // Arrange
    const patientId = 1;

    const prismaServiceMock = {
      patient: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    const patientsService = new PatientsService(prismaServiceMock as any);

    // Act and Assert
    await expect(patientsService.findOne(patientId)).rejects.toThrowError(
      new HttpException('The record with the given ID was not found', HttpStatus.NOT_FOUND),
    );
    expect(prismaServiceMock.patient.findUnique).toHaveBeenCalledWith({ where: { patientId } });
  });
});


