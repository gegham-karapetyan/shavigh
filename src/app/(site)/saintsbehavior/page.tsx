import { notFound, redirect } from "next/navigation";
import { getSaintsBehaviorData } from "./actions";

export default async function Page() {
  const { data, error } = await getSaintsBehaviorData();

  const sections = data?.find(
    (item) => item.url === "saintsbehavior/echmiadzin"
  )?.sections;

  if (error || !sections) {
    return notFound();
  }

  return redirect("/" + sections[0].url);
}
