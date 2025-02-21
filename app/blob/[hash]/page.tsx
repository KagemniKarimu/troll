import { TrollUI } from "@/app/page";

interface BlobPageProps {
  params: {
    hash: string;
  };
}

export default async function BlobPage({ params }: BlobPageProps) {
  // Validate the hash parameter if needed
  if (!params.hash || typeof params.hash !== "string") {
    throw new Error("Invalid hash parameter");
  }

  return <TrollUI initialHash={params.hash} />;
}
