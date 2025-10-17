import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

const DEFAULT_STUDENTS = [
  "Ade Rahmawati",
  "Adril Fadilan",
  "Afifah",
  "Amanda",
  "Asriyanti",
  "Asifa",
  "Bintang Shilky T.",
  "Bulan",
  "Eka Bunga Pratiwi",
  "Febriyanti",
  "Fika",
  "Hafizah Kael",
  "Ica Arianti",
  "Ines Pratiwi",
  "Marisda",
  "Hidayatullah",
  "Muh. Daud Rasyid",
  "Muh. Faruq Dzammar",
  "Muh. Zulkfly",
  "Multi",
  "Nabila Aminuddin",
  "Nanda Fritma A.",
  "Nur Azizanti",
  "Nur Yasmin",
  "Putri Adila",
  "Putri Nur Afifah",
  "Rahmawati",
  "Restu Nur Hasanah",
  "Salsabila",
  "Siti Rahmatia D.",
  "Siti Nurhaseni",
  "Wa Ode Mayanti",
  "Wd. Melani Pratama P.",
  "Wd. Nuzul Rahmadani",
  "Wd. Siti Nurdelia",
]

async function seedStudents() {
  console.log("Starting to seed students...")

  try {
    // Check if students already exist
    const { data: existingStudents } = await supabase.from("students").select("id").limit(1)

    if (existingStudents && existingStudents.length > 0) {
      console.log("Students already exist. Skipping seed.")
      return
    }

    // Insert students
    const { data, error } = await supabase
      .from("students")
      .insert(DEFAULT_STUDENTS.map((name) => ({ name, status: "belum", total_paid: 0 })))
      .select()

    if (error) {
      console.error("Error seeding students:", error)
      return
    }

    console.log(`Successfully seeded ${data?.length || 0} students`)
  } catch (error) {
    console.error("Error:", error)
  }
}

seedStudents()
