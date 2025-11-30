import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import EntityHelper from '../../utils/entities/entity-helper.js';
import { FileEntity } from '../../files/entities/file.entity.js';
import { AddressEntity } from '../../address/entities/address.entity.js';

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

  @ManyToOne(() => AddressEntity, address => address.id, {
    onDelete: 'RESTRICT',
    nullable: true,
    eager: true,
  })
  address: AddressEntity;

  @ManyToOne(() => FileEntity, file => file.id, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  image: FileEntity | null;
}
