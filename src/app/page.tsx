import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-2 pt-3 sm:pb-32 lg:pt-4 xl:pt-6 lg:pb-52">
          <p className="text-5xl">Dashboard</p>
          <div className="flex flex-row gap-4 pt-10">
            <Link href={"/dashboard/pages"}>
              <Card>
                <CardHeader>
                  <CardTitle>Pages</CardTitle>
                  <CardDescription>Create and edit pages here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>2 Pages</p>
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
                  <p>24 Posts</p>
                </CardContent>
              </Card>
            </Link>

            <Link href={"/dashboard/plugins"}>
              <Card>
                <CardHeader>
                  <CardTitle>Plugins</CardTitle>
                  <CardDescription>
                    Create and edit plugins here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Manage your plugins</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
