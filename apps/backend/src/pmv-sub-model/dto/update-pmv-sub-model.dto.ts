import { PartialType } from '@nestjs/mapped-types';
import { CreatePmvSubModelDto } from './create-pmv-sub-model.dto';

export class UpdatePmvSubModelDto extends PartialType(CreatePmvSubModelDto) {}
