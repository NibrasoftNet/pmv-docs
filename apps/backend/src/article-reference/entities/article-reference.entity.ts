import EntityHelper from '../../utils/entities/entity-helper.js';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import {} from '@workspace/orpc';
import { LanguageEntity } from '../../language/entities/language.entity.js';

export enum ArticleReferenceEnum {
  OEM = 'OEM',
  OES = 'OES',
  IAM = 'IAM',
  AM = 'AM',
  EAN = 'EAN',
  OE = 'OE',
}
@Entity('article_reference')
export class ArticleReferenceEntity extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ArticleReferenceEnum,
  })
  code: ArticleReferenceEnum;

  @Column()
  name: string;

  @ManyToOne(() => LanguageEntity, { eager: true, nullable: false })
  language: LanguageEntity;
}
