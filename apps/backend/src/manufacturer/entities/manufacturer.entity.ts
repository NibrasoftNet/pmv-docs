import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import EntityHelper from '../../utils/entities/entity-helper.js';
import { CountryEntity } from '../../country/entities/country.entity.js';
import { FileEntity } from '../../files/entities/file.entity.js';
import { LanguageEntity } from '../../language/entities/language.entity.js';

@Entity('manufacturer')
export class ManufacturerEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  manufacturerId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: Boolean, default: true })
  isPassengerCar: boolean;

  @Column({ type: Boolean, default: true })
  isCommercialVehicle: boolean;

  @Column({ type: Boolean, default: true })
  isMotorbike: boolean;

  @Column({ type: Boolean, default: true })
  isLCV: boolean;

  @Column({ type: Boolean, default: true })
  isDriverCab: boolean;

  @Column({ type: Boolean, default: true })
  isAxle: boolean;

  @Column({ type: Boolean, default: true })
  isEngine: boolean;

  @Column({ type: Boolean, default: true })
  isBus: boolean;

  @Column({ type: Boolean, default: true })
  isAftermarket: boolean;

  @Column({ type: Boolean, default: true })
  isTractor: boolean;

  @Column({ type: Boolean, default: true })
  isVirtualOEM: boolean;

  @Column({ type: Boolean, default: true })
  active: boolean;

  @Column({ type: 'varchar', nullable: true })
  websiteURL: string | null;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @ManyToOne(() => FileEntity, (file) => file.id, { nullable: true, eager: true })
  image: FileEntity | null;

  @ManyToOne(() => CountryEntity, (country) => country.id, { onDelete: 'RESTRICT', nullable: false, eager: true })
  originCountry: CountryEntity;

  @ManyToOne(() => LanguageEntity, (language) => language.id, { onDelete: 'CASCADE', nullable: false, eager: true })
  language: LanguageEntity;
}
