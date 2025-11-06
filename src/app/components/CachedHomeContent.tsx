import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import image0 from "@/app/assets/0.webp";

export default async function CachedHomeContent() {
  "use cache";

  cacheLife("minutes");
  cacheTag("home");

  return (
    <main className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl font-bold">Welcome to Bizarrap</h1>

      <div className="flex items-center gap-6">
        <Image src={image0} alt="Bizarrap" width={200} height={200} />
        <Image src={image0} alt="Bizarrap" width={200} height={200} />
        <Image src={image0} alt="Bizarrap" width={200} height={200} />
        <Image src={image0} alt="Bizarrap" width={200} height={200} />
      </div>
    </main>
  );
}




