import { LanguageEntity } from '../../language/entities/language.entity.js';
import EntityHelper from '../../utils/entities/entity-helper.js';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity('pmv_category')
export class PmvCategoryEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'text' })
  label: string;

  @ManyToOne(() => LanguageEntity, (language) => language.id, { onDelete: 'CASCADE', nullable: false, eager: true })
  language: LanguageEntity;
}
