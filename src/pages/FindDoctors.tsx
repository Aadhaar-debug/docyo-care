import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DoctorCard, Doctor } from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock doctor data
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    speciality: "Cardiologist",
    location: "Apollo Hospital, New Delhi",
    fee: 500,
    rating: 4.8,
    reviews: 342,
    availability: "Mon-Fri, 10AM-6PM",
    qualifications: ["MBBS", "MD (Cardiology)", "DNB"],
    experience: 15,
    image: "👨‍⚕️",
    bio: "Renowned cardiologist specializing in heart disease diagnosis and treatment. Expert in preventive cardiology and lifestyle management.",
    languages: ["English", "Hindi"],
    onlineConsultation: true,
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    speciality: "Dermatologist",
    location: "Max Healthcare, Mumbai",
    fee: 400,
    rating: 4.7,
    reviews: 285,
    availability: "Tue-Sat, 2PM-8PM",
    qualifications: ["MBBS", "MD (Dermatology)", "IAAD"],
    experience: 12,
    image: "👩‍⚕️",
    bio: "Specialist in skin health and aesthetic dermatology. Treats acne, psoriasis, and performs cosmetic procedures with precision.",
    languages: ["English", "Hindi", "Marathi"],
    onlineConsultation: true,
  },
  {
    id: "3",
    name: "Dr. Arvind Patel",
    speciality: "Orthopedic Surgeon",
    location: "Fortis Hospital, Bangalore",
    fee: 600,
    rating: 4.9,
    reviews: 428,
    availability: "Mon-Thu, 9AM-5PM",
    qualifications: ["MBBS", "MS (Orthopedics)", "Fellowship in Sports Medicine"],
    experience: 18,
    image: "👨‍⚕️",
    bio: "Expert orthopedic surgeon with specialization in joint replacement and sports injuries. Pioneering in minimally invasive techniques.",
    languages: ["English", "Hindi", "Gujarati"],
    onlineConsultation: false,
  },
  {
    id: "4",
    name: "Dr. Neha Gupta",
    speciality: "General Physician",
    location: "AIIMS, New Delhi",
    fee: 300,
    rating: 4.6,
    reviews: 512,
    availability: "Daily, 8AM-2PM",
    qualifications: ["MBBS", "MD (General Medicine)"],
    experience: 10,
    image: "👩‍⚕️",
    bio: "Compassionate general physician offering comprehensive health management and preventive care. Strong patient counseling approach.",
    languages: ["English", "Hindi", "Punjabi"],
    onlineConsultation: true,
  },
  {
    id: "5",
    name: "Dr. Vikram Singh",
    speciality: "Neurologist",
    location: "Sir Ganga Ram Hospital, Delhi",
    fee: 550,
    rating: 4.8,
    reviews: 198,
    availability: "Wed-Sat, 11AM-4PM",
    qualifications: ["MBBS", "MD (Neurology)", "DM (Neurology)"],
    experience: 14,
    image: "👨‍⚕️",
    bio: "Specialized neurologist treating migraine, epilepsy, and movement disorders. Experienced in advanced neuroimaging interpretation.",
    languages: ["English", "Hindi"],
    onlineConsultation: true,
  },
];

const specialities = [
  "All Specialities",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic Surgeon",
  "General Physician",
  "Neurologist",
];

const locations = [
  "All Locations",
  "New Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
];

export default function FindDoctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All Specialities");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [maxFee, setMaxFee] = useState("1000");
  const [onlineOnly, setOnlineOnly] = useState(false);

  // Filter doctors based on selected criteria
  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpeciality =
        selectedSpeciality === "All Specialities" ||
        doctor.speciality === selectedSpeciality;

      const matchesLocation =
        selectedLocation === "All Locations" ||
        doctor.location.includes(selectedLocation);

      const matchesFee = doctor.fee <= parseInt(maxFee);

      const matchesOnline = !onlineOnly || doctor.onlineConsultation;

      return (
        matchesSearch &&
        matchesSpeciality &&
        matchesLocation &&
        matchesFee &&
        matchesOnline
      );
    });
  }, [
    searchTerm,
    selectedSpeciality,
    selectedLocation,
    maxFee,
    onlineOnly,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpeciality("All Specialities");
    setSelectedLocation("All Locations");
    setMaxFee("1000");
    setOnlineOnly(false);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedSpeciality !== "All Specialities" ||
    selectedLocation !== "All Locations" ||
    parseInt(maxFee) < 1000 ||
    onlineOnly;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-accent/10 to-background py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Doctor</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Search and connect with qualified healthcare professionals. View their
                credentials, availability, and book appointments easily.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name or speciality..."
                className="pl-12 py-6 text-base rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Filter & Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </CardTitle>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-8 px-2"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Speciality Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      Speciality
                    </label>
                    <Select
                      value={selectedSpeciality}
                      onValueChange={setSelectedSpeciality}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {specialities.map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      Location
                    </label>
                    <Select
                      value={selectedLocation}
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="text-sm font-semibold mb-3 block">
                      Max Consultation Fee
                    </label>
                    <Select value={maxFee} onValueChange={setMaxFee}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">₹300</SelectItem>
                        <SelectItem value="500">₹500</SelectItem>
                        <SelectItem value="700">₹700</SelectItem>
                        <SelectItem value="1000">₹1000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Online Consultation Filter */}
                  <div>
                    <Button
                      onClick={() => setOnlineOnly(!onlineOnly)}
                      variant={onlineOnly ? "default" : "outline"}
                      className="w-full justify-start"
                    >
                      {onlineOnly ? "✓" : "○"} Online Consultation Only
                    </Button>
                  </div>

                  {/* Filter Stats */}
                  <div className="p-3 bg-secondary/50 rounded-lg text-sm text-muted-foreground text-center">
                    Showing {filteredDoctors.length} of {mockDoctors.length} doctors
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Doctors Grid */}
            <div className="lg:col-span-3">
              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                      No doctors found matching your criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Platform?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">✓</div>
                  <h3 className="font-semibold mb-2">Verified Credentials</h3>
                  <p className="text-sm text-muted-foreground">
                    All doctors are verified with authentic qualifications and experience
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">📅</div>
                  <h3 className="font-semibold mb-2">Easy Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Book appointments instantly and receive instant confirmations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">⭐</div>
                  <h3 className="font-semibold mb-2">Real Reviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Read authentic patient reviews to help make informed decisions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
