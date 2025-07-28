import dynamic from "next/dynamic";

const NoSsrPage = dynamic(() => import("./_no-ssr"));
export default function Page() {
  return <NoSsrPage />;
}
