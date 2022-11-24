import { PartialType } from '@nestjs/swagger';
import { CreateArtpoporDto } from './create-artpopor.dto';

export class UpdateArtpoporDto extends PartialType(CreateArtpoporDto) {}
