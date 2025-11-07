import { FileEntity } from "../../files/entities/file.entity.js";
import { LanguageEntity } from "../../language/entites/language.entity.js";
import EntityHelper from "../../utils/entities/entity-helper.js";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('article_category')
export class ArticleCategoryEntity extends EntityHelper {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    level: number;

    @ManyToOne(() => ArticleCategoryEntity, (category) => category.children, { nullable: true })
    parent: ArticleCategoryEntity;

    @OneToMany(() => ArticleCategoryEntity, (articleCategory) => articleCategory.parent, { cascade: true })
    children: ArticleCategoryEntity[];

    @ManyToOne(() => LanguageEntity, (language) => language.id, { onDelete: 'CASCADE', nullable: false, eager: true })
    language: LanguageEntity;

    @ManyToOne(() => FileEntity, (file) => file.id, { nullable: true, eager: true })
    image: FileEntity | null;
}