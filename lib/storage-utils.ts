export function updateStudentsData(students: any[]) {
  localStorage.setItem("students", JSON.stringify(students))
  // Trigger custom event for same-tab updates
  window.dispatchEvent(new Event("data-updated"))
}

export function updatePaymentsData(payments: any[]) {
  localStorage.setItem("payments", JSON.stringify(payments))
  // Trigger custom event for same-tab updates
  window.dispatchEvent(new Event("data-updated"))
}
