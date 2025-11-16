import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import EntityHelper from '../../../utils/entities/entity-helper.js';
import { ManufacturerEntity } from "../../../manufacturer/entities/manufacturer.entity.js";
import { LanguageEntity } from "../../../language/entities/language.entity.js";

@Entity('oem_reference')
export class OemReferenceEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    oemReferenceId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('jsonb', { nullable: true })
    specifications: { key: string; value: string }[] | null;

    @ManyToOne(() => ManufacturerEntity, manufacturer => manufacturer.id, { onDelete: 'CASCADE', eager: true })
    manufacturer: ManufacturerEntity

    @ManyToOne(() => LanguageEntity, language => language.id, { onDelete: 'CASCADE', eager: true })
    language: LanguageEntity
}
