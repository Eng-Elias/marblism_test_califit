import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class WorkoutPlanExerciseCreateDto {
  @IsNumber()
  @IsNotEmpty()
  order: number

  @IsString()
  @IsOptional()
  workoutPlanId?: string

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

export class WorkoutPlanExerciseUpdateDto {
  @IsNumber()
  @IsOptional()
  order?: number

  @IsString()
  @IsOptional()
  workoutPlanId?: string

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
