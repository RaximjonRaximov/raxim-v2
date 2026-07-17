import { getSiteContent, updateSiteContent } from "@/actions/admin";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Content — Admin — Raxim",
};

export default async function AdminContentPage() {
  const keys = ["hero_headline", "hero_subtitle", "hero_cta", "about_text", "services_intro"];
  const values = Object.fromEntries(await Promise.all(keys.map(async (k) => [k, await getSiteContent(k)])));

  async function save(formData: FormData) {
    "use server";
    for (const key of keys) {
      await updateSiteContent(key, String(formData.get(key) || ""));
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Site content</h1>
      <Card className="mt-8 p-6 max-w-2xl">
        <form action={save} className="space-y-6">
          {keys.map((key) => (
            <div key={key}>
              <label className="block mb-2 text-xs font-mono uppercase tracking-label text-muted">{key}</label>
              <textarea
                name={key}
                defaultValue={values[key] || ""}
                rows={key.includes("_text") ? 5 : 2}
                className="w-full p-4 rounded-2xl border border-line bg-paper"
              />
            </div>
          ))}
          <Button type="submit">Save content</Button>
        </form>
      </Card>
    </div>
  );
}
