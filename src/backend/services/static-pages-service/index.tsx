import { StaticPagesType } from "@/constants";
import { db } from "@/backend/db";
import { draftStaticPagesTable, staticPagesTable } from "@/backend/db/schema";
import { UpdateDraftHomePage } from "@/interfaces/static-pages.mode";
import { schemas } from "./validation.schemas";
import { eq } from "drizzle-orm";

class StaticPages {
  pageNames = [
    "home",
    "fait",
    "sanctuary-attitude",
    "books",
    "articles",
    "bible",
    "podcasts",
  ];
  async isValidPageName(pageName: StaticPagesType): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.pageNames.includes(pageName)) {
        resolve(true);
      } else {
        reject(new Error(`Invalid page name: ${pageName}`));
      }
    });
  }
  async getPage(pageName: StaticPagesType) {
    await this.isValidPageName(pageName);
    const draft = await db
      .select()
      .from(staticPagesTable)
      .where(eq(staticPagesTable.pageName, pageName))
      .limit(1);
    console.log(draft);
    return draft[0];
  }
  async copyToDraft(pageName: StaticPagesType) {
    await this.isValidPageName(pageName);
    const page = await this.getPage(pageName);
    const copyPage = await db
      .insert(draftStaticPagesTable)
      .values(page)
      .returning();
    return copyPage[0];
  }
  async getDraftPage(pageName: StaticPagesType) {
    await this.isValidPageName(pageName);
    const draft = await db
      .select()
      .from(draftStaticPagesTable)
      .where(eq(draftStaticPagesTable.pageName, pageName))
      .limit(1);

    return draft[0];
  }
  async updateDraftPage(
    pageName: StaticPagesType,
    data: UpdateDraftHomePage | number
  ) {
    await this.isValidPageName(pageName);
    const result = await schemas[pageName].parseAsync(data);

    await db
      .update(draftStaticPagesTable)
      .set({
        content: JSON.stringify(result),
      })
      .where(eq(draftStaticPagesTable.pageName, pageName));
  }
}

export const staticPages = new StaticPages();
