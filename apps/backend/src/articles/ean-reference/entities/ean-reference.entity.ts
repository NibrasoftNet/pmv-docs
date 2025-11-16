import { FileEntity } from "../../../files/entities/file.entity.js";
import EntityHelper from "../../../utils/entities/entity-helper.js";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SupplierEntity } from "../../../supplier/entities/supplier.entity.js";
import { ArticleCategoryEntity } from "../../../article-category/entities/article-category.entity.js";
import { LanguageEntity } from "../../../language/entities/language.entity.js";

@Entity('ean_reference')
export class EanReferenceEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn()
    eanReferenceId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('jsonb', { nullable: true })
    specifications: { key: string; value: string }[] | null;

    @ManyToOne(() => FileEntity, (file: FileEntity) => file.id, { nullable: true, eager: true })
    image: FileEntity;

    @ManyToOne(() => SupplierEntity, (supplier: SupplierEntity) => supplier.id, { nullable: false, eager: true })
    supplier: SupplierEntity;

    @ManyToOne(() => ArticleCategoryEntity, (articleCategory: ArticleCategoryEntity) => articleCategory.id, { nullable: false, eager: true })
    articleCategory: ArticleCategoryEntity;

    @ManyToOne(() => LanguageEntity, (language: LanguageEntity) => language.id, { nullable: false, eager: true })
    language: LanguageEntity;
}
