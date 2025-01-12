import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Link from "next/link";

export default async function Home() {
  return (
    <div className="grainy-light">
      <section>
        <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
          <p className="text-3xl sm:text-4xl">Dashboard</p>
          <div className="flex flex-row gap-4 pt-10">
            <Link href={"/dashboard/pages"}>
              <Card>
                <CardHeader>
                  <CardTitle>Pages</CardTitle>
                  <CardDescription>Create and edit pages here</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href={"/dashboard/posts"}>
              <Card>
                <CardHeader>
                  <CardTitle>Posts</CardTitle>
                  <CardDescription>Create and edit posts here</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
