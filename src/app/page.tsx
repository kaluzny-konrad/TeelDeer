import LinkBox from "@/components/containers/LinkBox";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main>
      <h1 className="font-bold text-3xl md:text-4xl">Popular articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* feed */}
        {/* {session?.user ? <CustomFeed /> : <DefaultFeed />} */}
        <LinkBox
          title={""}
          description={""}
          href={"/articles/create"}
          linkTitle={"Create article"}
        />
      </div>
    </main>
  );
}
