import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthenticationDto } from './create-auth.dto';

export class UpdateAuthenticationDto extends PartialType(CreateAuthenticationDto) {}
