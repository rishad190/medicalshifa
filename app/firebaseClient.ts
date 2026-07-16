export async function createAppointment(appointment: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return appointment;
  }

  const existing = JSON.parse(localStorage.getItem("appointments") || "[]");
  const nextAppointment = {
    id: Math.random().toString(36).slice(2, 10),
    ...appointment,
    dateCreated: new Date().toISOString(),
    status: "Pending",
  };

  localStorage.setItem(
    "appointments",
    JSON.stringify([nextAppointment, ...existing]),
  );
  return nextAppointment;
}
