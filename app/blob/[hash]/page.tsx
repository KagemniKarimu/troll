import { TrollUI } from "@/app/page";
import { Metadata } from "next";

type Props = {
  params: Promise<{ hash: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hash = (await params).hash;

  return {
    title: `${hash} troll`,
  };
}

export default async function Page({ params }: Props) {
  return <TrollUI initialHash={(await params).hash} />;
}
