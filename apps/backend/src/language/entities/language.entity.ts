import EntityHelper from '../../utils/entities/entity-helper.js';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('language')
export class LanguageEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  isoCode: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  locale: string;

  @Column({ type: 'text', nullable: true })
  flagEmoji: string;
}
