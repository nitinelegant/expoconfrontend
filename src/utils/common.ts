export default function formatDateToYear(input: string): string {
  const date = new Date(input);
  const day = date.getDate().toString().padStart(2, "0"); // Ensures two-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

type StatusType = "create" | "update" | "delete";

export const getStatusColor = (type?: StatusType): string => {
  switch (type) {
    case "create":
      return "#008000";
    case "update":
      return "#FFA500";
    case "delete":
      return "#FF0000";
    default:
      return "#000";
  }
};

export const getStatusText = (type?: StatusType): string => {
  switch (type) {
    case "create":
      return "CREATE";
    case "update":
      return "UPDATE";
    case "delete":
      return "DELETE";
    default:
      return "";
  }
};

export const extractMapUrl = (value: string): string => {
  if (!value) return "";

  // If it's an iframe, extract the src
  if (value.includes("<iframe")) {
    const srcMatch = value.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  }

  // If it's already a URL, return it
  return value;
};

export const isValidGoogleMapLink = (value: string): boolean => {
  const url = extractMapUrl(value);
  return url.startsWith("https://www.google.com/maps/embed?pb=");
};

export const ValuesToShow = ["update"];
