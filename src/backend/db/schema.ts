// import { timestamp } from "drizzle-orm/mysql-core";
import { StaticPagesType } from "@/constants";
import { sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const staticPagesTable = sqliteTable(
  "static_pages_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    pageName: text("page_name").$type<StaticPagesType>().notNull(),
    content: text().notNull(), // html content
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => [uniqueIndex("page_name_idx").on(table.pageName)]
);
export const draftStaticPagesTable = sqliteTable(
  "draft_static_pages_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    pageName: text("page_name").$type<StaticPagesType>().notNull(),
    content: text(), // html content
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => [uniqueIndex("draft_page_name_idx").on(table.pageName)]
);

export const articlesTable = sqliteTable(
  "articles_table",
  {
    id: int().primaryKey({ autoIncrement: true }),
    slug: text().notNull(),
    content: text().notNull(), // html content
    description: text().notNull(), // html content
    createdAt: int("created_at", { mode: "timestamp" })
      .notNull()
      .default(sql`(current_timestamp)`),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => sql`(CURRENT_TIMESTAMP)`
    ),
  },
  (table) => [uniqueIndex("article_slug_idx").on(table.slug)]
);
