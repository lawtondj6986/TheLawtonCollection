"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, requireAdmin } from "@/lib/admin/auth";
import { isLeadStatus, updateLead } from "@/lib/admin/data";

export async function setLeadStatus(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const status = String(form.get("status") ?? "");
  if (!id || !isLeadStatus(status)) return;
  await updateLead(id, {
    status,
    contacted_at: status === "contacted" ? new Date().toISOString() : undefined,
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${id}`);
}

export async function saveLeadNote(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const note = String(form.get("note") ?? "").trim().slice(0, 4000);
  if (!id) return;
  await updateLead(id, { admin_note: note || null });
  revalidatePath(`/admin/leads/${id}`);
}

export async function signOut() {
  await clearSession();
  redirect("/admin/sign-in");
}
