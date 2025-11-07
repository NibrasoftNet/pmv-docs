CREATE TYPE "public"."article_reference_code_enum" AS ENUM('OEM', 'OES', 'IAM', 'AM', 'EAN', 'OE');
CREATE TABLE "article_reference" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "code" "public"."article_reference_code_enum" NOT NULL, "name" character varying NOT NULL, "languageId" integer NOT NULL, CONSTRAINT "PK_09cd1a4ee42dcdf508917942029" PRIMARY KEY ("id"));
ALTER TABLE "article_category" ADD "imageId" uuid;
ALTER TABLE "article_category" ADD CONSTRAINT "FK_c78fb8974287ba5a5026f1fd4a8" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "article_reference" ADD CONSTRAINT "FK_97cb6e56ebcee7e829479814b1b" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
