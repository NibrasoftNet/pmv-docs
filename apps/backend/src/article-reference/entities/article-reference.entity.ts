import EntityHelper from '../../utils/entities/entity-helper.js';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ArticleReferenceEnum } from '@workspace/orpc';
import { LanguageEntity } from '../../language/entities/language.entity.js';

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
