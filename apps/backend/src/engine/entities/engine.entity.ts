import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import EntityHelper from "../../utils/entities/entity-helper.js";
import { ManufacturerEntity } from "../../manufacturer/entities/manufacturer.entity.js";
import { LanguageEntity } from "../../language/entities/language.entity.js";

@Entity('engine')
export class EngineEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    engineId: number;

    @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.id, { onDelete: 'CASCADE', eager: true })
    manufacturer: ManufacturerEntity;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'date', nullable: true })
    startYear: Date | null

    @Column({ type: 'date', nullable: true })
    endYear: Date | null

    @Column({ type: Boolean, default: true })
    active: boolean;

    @ManyToOne(() => LanguageEntity, (language ) => language.id, { nullable: false, eager: true })
    language: LanguageEntity;
}
