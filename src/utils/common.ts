export default function formatDateToYear(input: string): string {
  const date = new Date(input);
  const day = date.getDate().toString().padStart(2, "0"); // Ensures two-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
