export const exhibitionTypes: string[] = [
  "Agriculture & Forestry",
  "Animals & Pets",
  "Apparel & Clothing",
  "Arts & Crafts",
  "Auto & Automotive",
  "Baby, Kids & Maternity",
  "Banking & Finance",
  "Building & Construction",
  "Business Services",
  "Education & Training",
  "Electric & Electronics",
  "Entertainment & Media",
  "Environment & Waste",
  "Fashion & Beauty",
  "Food & Beverages",
  "Home & Office",
  "Hospitality",
  "IT & Technology",
  "Industrial Engineering",
  "Logistics & Transportation",
  "Medical & Pharma",
  "Miscellaneous",
  "Packing & Packaging",
  "Power & Energy",
  "Science & Research",
  "Security & Defense",
  "Telecommunication",
  "Travel & Tourism",
  "Wellness, Health & Fitness",
];

interface StatesProps {
  id: number;
  name: string;
}
export const statesAndUnionTerritories: StatesProps[] = [
  { id: 1, name: "andhrapradesh" },
  { id: 2, name: "arunachalpradesh" },
  { id: 3, name: "assam" },
  { id: 4, name: "bihar" },
  { id: 5, name: "chhattisgarh" },
  { id: 6, name: "goa" },
  { id: 7, name: "gujarat" },
  { id: 8, name: "haryana" },
  { id: 9, name: "himachalpradesh" },
  { id: 10, name: "jharkhand" },
  { id: 11, name: "karnataka" },
  { id: 12, name: "kerala" },
  { id: 13, name: "madhyapradesh" },
  { id: 14, name: "maharashtra" },
  { id: 15, name: "manipur" },
  { id: 16, name: "meghalaya" },
  { id: 17, name: "mizoram" },
  { id: 18, name: "nagaland" },
  { id: 19, name: "odisha" },
  { id: 20, name: "punjab" },
  { id: 21, name: "rajasthan" },
  { id: 22, name: "sikkim" },
  { id: 23, name: "tamilnadu" },
  { id: 24, name: "telangana" },
  { id: 25, name: "tripura" },
  { id: 26, name: "uttarakhand" },
  { id: 27, name: "uttarpradesh" },
  { id: 28, name: "westbengal" },
  { id: 29, name: "andamanandnicobarislands" },
  { id: 30, name: "chandigarh" },
  { id: 31, name: "dadranagarhaveli" },
  { id: 32, name: "damandiu" },
  { id: 33, name: "delhincr" },
  { id: 34, name: "jammuandkashmir" },
  { id: 35, name: "ladakh" },
  { id: 36, name: "lakshadweep" },
  { id: 37, name: "puducherry" },
];
interface PrefixProps {
  id: number;
  name: string;
}
export const Prefix: PrefixProps[] = [
  { id: 1, name: "Mr" },
  { id: 2, name: "Mrs" },
];
interface MonthsProps {
  id: number;
  name: string;
}
export const months: MonthsProps[] = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export const years: string[] = [
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
];

export const eventTypes = ["Exhibition"];
interface CompanyTypesProps {
  id: number;
  name: string;
}

export const companyTypes: CompanyTypesProps[] = [
  { id: 1, name: "Exhibition Organizer" },
  { id: 2, name: "Professional Conference Organiser (PCO)" },
  { id: 3, name: "Assoaication" },
  { id: 4, name: "Audio & Visual (AV)" },
  { id: 5, name: "Custom Stall Construction" },
  { id: 6, name: "Stand Contracter" },
  { id: 7, name: "Registration Service" },
  { id: 8, name: "Event Production" },
  { id: 9, name: "Kit Bag Manufacturer" },
  { id: 10, name: "Event Management" },
  { id: 11, name: "Manpower Agency" },
  { id: 12, name: "Outdoor Catering" },
  { id: 13, name: "Logistics" },
  { id: 14, name: "Wi-Fi Services" },
  { id: 15, name: "Filming & Photography" },
  { id: 16, name: "Event Manager" },
];
interface AssociationTypesProps {
  id: number;
  name: string;
}

export const associationTypes: AssociationTypesProps[] = [
  { id: 1, name: "National Association" },
  { id: 2, name: "State Chapter / Branch" },
  { id: 3, name: "State Association" },
];
interface SegmentProps {
  id: number;
  name: string;
}

export const segmentTypes: SegmentProps[] = [
  { id: 1, name: "Anaesthesiology" },
  { id: 2, name: "Orthopedics" },
  { id: 3, name: "Dermatology" },
  { id: 4, name: "Cardiology" },
  { id: 5, name: "Psychiatrist" },
  { id: 6, name: "Gastroenterology" },
  { id: 7, name: "ENT" },
  { id: 8, name: "Obstetrics & Gynecology" },
  { id: 9, name: "Neurology" },
  { id: 10, name: "Urology" },
  { id: 11, name: "Dentist" },
  { id: 12, name: "Diabetes Endocrinology" },
  { id: 13, name: "Ophthalmology" },
  { id: 14, name: "General Surgery" },
  { id: 15, name: "Infectious Diseases" },
  { id: 16, name: "Internal Medicine" },
  { id: 17, name: "Nutrition" },
  { id: 18, name: "Nephrology" },
  { id: 19, name: "Paediatrica & Neonatology" },
  { id: 20, name: "Pathology" },
  { id: 21, name: "Radiology" },
];
