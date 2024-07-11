import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ProgressCreateDto {
  @IsString()
  @IsNotEmpty()
  date: string

  @IsString()
  @IsNotEmpty()
  performanceMetric: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  exerciseId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class ProgressUpdateDto {
  @IsString()
  @IsOptional()
  date?: string

  @IsString()
  @IsOptional()
  performanceMetric?: string

  @IsString()
  @IsOptional()
  userId?: string

  @IsString()
  @IsOptional()
  exerciseId?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}
