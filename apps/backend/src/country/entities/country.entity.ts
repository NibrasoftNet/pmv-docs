import { LanguageEntity } from '../../language/entities/language.entity.js';
import EntityHelper from '../../utils/entities/entity-helper.js';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('country')
export class CountryEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  isoCode1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  currencyCode: string;

  @Column({ type: Boolean, nullable: true })
  isGroup: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  isoCode2: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  isoCode3: string;

  @Column({ type: Number, nullable: true })
  isoCodeNo: number;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @ManyToOne(() => LanguageEntity, (language) => language.id, { onDelete: 'CASCADE', nullable: false, eager: true })
  language: LanguageEntity;
}
