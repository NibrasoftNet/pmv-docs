import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHelper from "../../../utils/entities/entity-helper.js";
import { IamReferenceEntity } from "../../../articles/iam-reference/entities/iam-reference.entity.js";
import { PmvSubModelEntity } from "../../../pmv-sub-model/entities/pmv-sub-model.entity.js";
import { FileEntity } from "../../../files/entities/file.entity.js";

@Entity('iam_join_sub_model')
export class IamJoinSubModelEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => IamReferenceEntity, (iamReference) => iamReference.id, { nullable: false })
    iamReference: IamReferenceEntity;

    @ManyToOne(() => PmvSubModelEntity, (subModel) => subModel.id, { nullable: false })
    subModel: PmvSubModelEntity;

    @ManyToOne(() => FileEntity, (file) => file.id, { nullable: true })
    document: FileEntity;
}
