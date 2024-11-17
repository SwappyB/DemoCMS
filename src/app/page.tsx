import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Link from "next/link";

import { getContentCount } from "@/server/service/pageService";

export default async function Home() {
  const contentCount = await getContentCount();
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
                <CardContent>
                  <p>{contentCount.totalPages} Pages</p>
                </CardContent>
              </Card>
            </Link>
            <Link href={"/dashboard/posts"}>
              <Card>
                <CardHeader>
                  <CardTitle>Posts</CardTitle>
                  <CardDescription>Create and edit posts here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{contentCount.totalPosts} Posts</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
