import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CountryEntity } from "../../country/entites/country.entity.js";
import EntityHelper from "../../utils/entities/entity-helper.js"

@Entity("address")
export class AddressEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    zip: string;

    @ManyToOne(() => CountryEntity, (country) => country.id, { onDelete: 'RESTRICT', nullable: false, eager: true })
    country: CountryEntity;

    @Column({ type: 'double precision', nullable: false })
    longitude: number;

    @Column({ type: 'double precision', nullable: false })
    latitude: number; 
}