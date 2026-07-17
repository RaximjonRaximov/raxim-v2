import { auth } from "@/lib/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { updateProfile } from "@/actions/auth";

export const metadata = {
  title: "Profile — Raxim",
};

async function handleUpdateProfile(formData: FormData) {
  "use server";
  await updateProfile(formData);
}

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl font-bold text-ink tracking-tight">Profile</h1>
      <p className="mt-2 text-muted">Update your account details.</p>

      <Card className="mt-8 p-6 max-w-lg">
        <form action={handleUpdateProfile} className="space-y-6">
          <Input name="name" label="Name" defaultValue={session?.user?.name || ""} />
          <Input name="email" type="email" label="Email" defaultValue={session?.user?.email || ""} disabled />
          <Button type="submit">Update profile</Button>
        </form>
      </Card>
    </div>
  );
}
