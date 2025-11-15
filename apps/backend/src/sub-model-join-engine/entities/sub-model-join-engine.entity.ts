import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHelper from "../../utils/entities/entity-helper.js";
import { PmvSubModelEntity } from "../../pmv-sub-model/entities/pmv-sub-model.entity.js";
import { EngineEntity } from "../../engine/entities/engine.entity.js";
import { PmvCategoryEntity } from "../../pmv-category/entities/pmv-category.entity.js";

@Entity('sub_model_join_engine')
export class SubModelJoinEngineEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => PmvSubModelEntity, (subModel) => subModel.id, { onDelete: 'CASCADE', nullable: false })
    subModel: PmvSubModelEntity;

    @ManyToOne(() => EngineEntity, (engine) => engine.id, { onDelete: 'CASCADE', nullable: false })
    engine: EngineEntity;

    @ManyToOne(() => PmvCategoryEntity, (category) => category.id, { onDelete: 'CASCADE', nullable: false })
    pmvCategory: PmvCategoryEntity;
}
