import EntityHelper from "../../utils/entities/entity-helper.js";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArticleCategoryEntity } from "../../article-category/entities/article-category.entity.js";
import { ArticleReferenceEntity } from "../../article-reference/entities/article-reference.entity.js";
import { LanguageEntity } from "../../language/entites/language.entity.js";
import { SupplierEntity } from "../../supplier/entities/supplier.entity.js";

@Entity('article')
export class ArticleEntity extends EntityHelper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column('jsonb', { nullable: true })
    specifications: { key: string; value: string }[] | null;

    @ManyToOne(() => SupplierEntity, (supplier: SupplierEntity) => supplier.id, { nullable: false, eager: true })
    supplier: SupplierEntity;

    @ManyToOne(() => ArticleCategoryEntity, (articleCategory: ArticleCategoryEntity) => articleCategory.id, { nullable: false, eager: true })
    articleCategory: ArticleCategoryEntity;

    @ManyToOne(() => ArticleReferenceEntity, (articleReference: ArticleReferenceEntity) => articleReference.id, { nullable: false, eager: true })
    articleReference: ArticleReferenceEntity;

    @ManyToOne(() => LanguageEntity, (language: LanguageEntity) => language.id, { nullable: false, eager: true })
    language: LanguageEntity;
}
