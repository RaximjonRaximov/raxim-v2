import { getSiteSetting, updateSiteSetting } from "@/actions/admin";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const metadata = {
  title: "Settings — Admin — Raxim",
};

export default async function AdminSettingsPage() {
  const keys = ["telegram_handle", "contact_email", "uzs_per_usd"];
  const values = Object.fromEntries(await Promise.all(keys.map(async (k) => [k, await getSiteSetting(k)])));

  async function save(formData: FormData) {
    "use server";
    for (const key of keys) {
      await updateSiteSetting(key, String(formData.get(key) || ""));
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Settings</h1>
      <Card className="mt-8 p-6 max-w-2xl">
        <form action={save} className="space-y-6">
          {keys.map((key) => (
            <Input key={key} name={key} label={key} defaultValue={values[key]} />
          ))}
          <Button type="submit">Save settings</Button>
        </form>
      </Card>
    </div>
  );
}
