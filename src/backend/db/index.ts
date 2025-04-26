import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import {
  // articlesTable, staticPagesTable,
  usersTable,
} from "./schema";
import { eq } from "drizzle-orm";
import Database from "better-sqlite3";
import { join } from "path";

const sqlite = new Database(join(process.cwd(), "local.db"));
export const db = drizzle({ client: sqlite });

export async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John sdfgsdfg",
    age: 30,
    email: "john@example.com",
  };
  await db.insert(usersTable).values(user);
  console.log("New user created!");
  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */
  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log("User deleted!");
}
// main();

// const seedArticles = async () => {
//   const p: (typeof articlesTable.$inferInsert)[] = [
//     {
//       slug: "article4",
//       content: "<h1>some  sdf sdf sgdf long article</h1>",
//       description: "<p>descr df hsdf hdfg hdfg hiption</p>",
//     },
//     {
//       slug: "article2",
//       content:
//         "<h1>lorem ipsVeniam sunt ad pariatur ut commodo duis minim qui ex commodo nulla cillum consectetur.</h1>",
//       description: "<p>lorem ipsVeniam sunt ad pariatur ut commodo</p>",
//     },
//     {
//       slug: "article3",
//       content:
//         "<h1>loremQuis excepteur sunt laboris excepteur nostrud est qui consequat id dolor adipisicing.</h1>",
//       description: "<p> excepteur sunt laboris excepteur</p>",
//     },
//   ] as const;
//   await db.insert(articlesTable).values(p);

//   console.log("done");
// };
// const seedHomePage = async () => {
//   const homePage: typeof staticPagesTable.$inferInsert = {
//     pageName: "home",
//     content: JSON.stringify({
//       welcome:
//         "<h1>Welcome to our website!</h1><p>This is a sample content for the home page.</p>",
//     }),
//   };
//   await db.insert(staticPagesTable).values(homePage);
//   console.log("home page created!");
// };
// seedHomePage();
// seedArticles();
