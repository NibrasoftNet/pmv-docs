import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import EntityHelper from "../../utils/entities/entity-helper.js";
import { ManufacturerEntity } from "../../manufacturer/entities/manufacturer.entity.js";
import { PmvCategoryEntity } from "../../pmv-category/entities/pmv-category.entity.js";

@Entity('pmv_model')
export class PmvModelEntity extends EntityHelper {
    @PrimaryColumn()
    id: number

    @ManyToOne(() => ManufacturerEntity, (manufacturer: ManufacturerEntity) => manufacturer.id, { nullable: false, eager: true })
    manufacturer: ManufacturerEntity
    
    @Column({ type: 'date', nullable: false })
    startYear: Date

    @Column({ type: 'date', nullable: false })
    endYear: Date

    @Column({ nullable: false })
    name: string

    @ManyToOne(() => PmvCategoryEntity, (pmvCategory: PmvCategoryEntity) => pmvCategory.id, { nullable: false, eager: true })
    pmvType: PmvCategoryEntity
}
