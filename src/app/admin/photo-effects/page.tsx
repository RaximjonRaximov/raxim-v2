import Link from "next/link";
import Image from "next/image";
import { adminListProducts, adminDeleteProduct } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Photo Effects — Admin — Raxim",
};

export default async function AdminPhotoEffectsPage() {
  const packs = await adminListProducts("PROMPT_PACK");

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ink tracking-tight">Photo Effects</h1>
        <Link href="/admin/photo-effects/new">
          <Button size="sm">New effect</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <Card key={pack.id} className="p-0 overflow-hidden">
            <div className="relative aspect-[16/10]">
              <Image
                src={pack.coverImage}
                alt={pack.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-ink">{pack.title}</h3>
              <p className="mt-1 text-sm text-muted line-clamp-2">{pack.description}</p>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/admin/photo-effects/${pack.id}/edit`}>
                  <Button size="sm" variant="outline">Edit</Button>
                </Link>
                <DeleteButton id={pack.id} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  async function deleteAction() {
    "use server";
    await adminDeleteProduct(id);
  }

  return (
    <form action={deleteAction}>
      <Button type="submit" size="sm" variant="outline" className="text-rose border-rose hover:bg-rose/10">Delete</Button>
    </form>
  );
}
