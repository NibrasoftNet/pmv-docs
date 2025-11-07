import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import EntityHelper from '../../utils/entities/entity-helper.js';
import { CountryEntity } from '../../country/entites/country.entity.js';
import { PmvCategoryEntity } from '../../pmv-category/entities/pmv-category.entity.js';
import { FileEntity } from '../../files/entities/file.entity.js';

@Entity('manufacturer')
export class ManufacturerEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  manufacturerId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  websiteURL: string | null;

  @Column({ type: 'decimal', default: 0 })
  modelsCount: number;

  @ManyToOne(() => FileEntity, (file) => file.id, { nullable: true, eager: true })
  image: FileEntity | null;

  @ManyToOne(() => PmvCategoryEntity, (pmvCategory) => pmvCategory.id, { onDelete: 'RESTRICT', nullable: false, eager: true })
  pmvCategory: PmvCategoryEntity;

  @ManyToOne(() => CountryEntity, (country) => country.id, { onDelete: 'RESTRICT', nullable: false, eager: true })
  originCountry: CountryEntity;
}
