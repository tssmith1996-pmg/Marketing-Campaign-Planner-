import Sidebar from "../(components)/sidebar";
import { authGuard } from "../(components)/auth";
import prisma from "../(components)/prisma";
import { revalidatePath } from "next/cache";

async function createClient(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString() ?? "";
  const { orgId } = await authGuard();
  if (name.trim().length < 2) return;
  await prisma.client.create({ data: { name, orgId } });
  revalidatePath("/clients");
}

export default async function ClientsPage() {
  const { orgId } = await authGuard();
  const clients = await prisma.client.findMany({ where: { orgId } });
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <Sidebar />
      <section style={{ padding: 24, flex: 1 }}>
        <h2>Clients</h2>
        <form action={createClient} style={{ marginTop: 16, marginBottom: 24 }}>
          <input
            type="text"
            name="name"
            placeholder="New client name"
            style={{ border: "1px solid #cbd5e1", padding: 8, marginRight: 8 }}
          />
          <button type="submit" style={{ padding: "8px 16px", background: "#1f2937", color: "white" }}>
            Add
          </button>
        </form>
        <ul>
          {clients.map((c) => (
            <li key={c.id} style={{ padding: "4px 0" }}>
              {c.name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
