import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return <main className="">Hello, {session?.user?.email}</main>;
}
