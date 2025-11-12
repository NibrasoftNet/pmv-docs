import EntityHelper from "../../utils/entities/entity-helper.js";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ManufacturerEntity } from "../../manufacturer/entities/manufacturer.entity.js";
import { PmvModelEntity } from "../../pmv-model/entities/pmv-model.entity.js";
import { FileEntity } from "../../files/entities/file.entity.js";
import { LanguageEntity } from "../../language/entities/language.entity.js";
import { PmvCategoryEntity } from "../../pmv-category/entities/pmv-category.entity.js";

@Entity('pmv_sub_model')
export class PmvSubModelEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    subModelId: number

    @ManyToOne(() => PmvModelEntity, (model: PmvModelEntity) => model.id, { nullable: false, eager: true })
    model: PmvModelEntity

    @ManyToOne(() => ManufacturerEntity, (manufacturer: ManufacturerEntity) => manufacturer.id, { nullable: false, eager: true })
    manufacturer: ManufacturerEntity

    @Column({ type: 'date', nullable: true })
    startYear: Date | null

    @Column({ type: 'date', nullable: true })
    endYear: Date | null

    @Column({ nullable: true })
    name: string

    @Column({ type: Boolean, default: true })
    active: boolean;

    @ManyToOne(() => PmvCategoryEntity  , (category: PmvCategoryEntity) => category.id, { nullable: false, eager: true })
    pmvCategory: PmvCategoryEntity

    @ManyToOne(() => FileEntity, (file) => file.id, { nullable: true, eager: true })
    image: FileEntity | null;

    @ManyToOne(() => LanguageEntity, (language) => language.id, { onDelete: 'CASCADE', nullable: false, eager: true })
    language: LanguageEntity;
}
