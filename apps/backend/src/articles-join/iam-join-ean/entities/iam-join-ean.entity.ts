import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHelper from "../../../utils/entities/entity-helper.js";
import { IamReferenceEntity } from "../../../articles/iam-reference/entities/iam-reference.entity.js";
import { EanReferenceEntity } from "../../../articles/ean-reference/entities/ean-reference.entity.js";

export class IamJoinEanEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => IamReferenceEntity, (iamReference) => iamReference.id, { nullable: false })
    iamReference: IamReferenceEntity;

    @ManyToOne(() => EanReferenceEntity, (eanReference) => eanReference.id, { nullable: false })
    eanReference: EanReferenceEntity;
}
