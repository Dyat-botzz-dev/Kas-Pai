import { migrateDataToSupabase } from "@/scripts/02-migrate-data"

export async function POST() {
  try {
    await migrateDataToSupabase()
    return Response.json({ success: true, message: "Data migration completed" })
  } catch (error) {
    console.error("Migration error:", error)
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}
