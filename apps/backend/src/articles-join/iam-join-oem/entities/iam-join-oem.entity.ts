import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHelper from "../../../utils/entities/entity-helper.js";
import { IamReferenceEntity } from "../../../articles/iam-reference/entities/iam-reference.entity.js";
import { OemReferenceEntity } from "../../../articles/oem-reference/entities/oem-reference.entity.js";

@Entity('iam_join_oem')
export class IamJoinOemEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => IamReferenceEntity, (iamReference) => iamReference.id, { nullable: false })
    iamReference: IamReferenceEntity;

    @ManyToOne(() => OemReferenceEntity, (oemReference) => oemReference.id, { nullable: false })
    oemReference: OemReferenceEntity;
}
