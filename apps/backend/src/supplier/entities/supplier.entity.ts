import { CountryEntity } from '../../country/entites/country.entity.js';
import { Entity, Column, PrimaryColumn, Index, ManyToOne } from 'typeorm';
import EntityHelper from '../../utils/entities/entity-helper.js';
import { FileEntity } from '../../files/entities/file.entity.js';

@Entity('supplier')
export class SupplierEntity extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  matchCode: string;
  
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  websiteURL: string | null;

  @Column({ type: 'int', default: 0 })
  articlesCount: number;

  @ManyToOne(() => CountryEntity, (country) => country.id, { onDelete: 'RESTRICT', nullable: false, eager: true })
  originCountry: CountryEntity;

  @ManyToOne(() => FileEntity, (file) => file.id, { onDelete: 'SET NULL', nullable: true, eager: true })
  image: FileEntity | null;
}