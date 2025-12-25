import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Clock, Video, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    qualification: "MD, FACC",
    experience: 15,
    rating: 4.9,
    reviews: 234,
    clinicName: "HeartCare Medical Center",
    city: "San Francisco",
    consultationFee: 150,
    acceptsOnline: true,
    nextAvailable: "Today, 3:00 PM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialization: "General Physician",
    qualification: "MBBS, MD",
    experience: 12,
    rating: 4.8,
    reviews: 189,
    clinicName: "City Health Clinic",
    city: "San Francisco",
    consultationFee: 100,
    acceptsOnline: true,
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialization: "Dermatologist",
    qualification: "MD, FAAD",
    experience: 8,
    rating: 4.7,
    reviews: 156,
    clinicName: "Skin & Wellness Center",
    city: "San Francisco",
    consultationFee: 120,
    acceptsOnline: false,
    nextAvailable: "Dec 27, 2:00 PM",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
  },
];

const specializations = [
  "All",
  "Cardiologist",
  "General Physician",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Neurologist",
];

export const DoctorDiscoverySection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");

  return (
    <section id="doctors" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4"
          >
            Find Doctors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Discover <span className="text-gradient">Trusted Doctors</span> Near You
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Find verified healthcare professionals, check their availability, and book
            appointments instantly.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by doctor name, specialty, or condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button variant="outline" size="lg" className="h-12 px-4">
              <MapPin className="w-5 h-5 mr-2" />
              San Francisco
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-4">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Specialization Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {specializations.map((spec) => (
            <Button
              key={spec}
              variant={selectedSpec === spec ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSpec(spec)}
              className="rounded-full"
            >
              {spec}
            </Button>
          ))}
        </motion.div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
            >
              <Card variant="gradient" className="overflow-hidden hover:shadow-elevated transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      {doctor.acceptsOnline && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                          <Video className="w-3 h-3 text-accent-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialization}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {doctor.qualification} • {doctor.experience} yrs exp
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({doctor.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{doctor.clinicName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent font-medium">
                          {doctor.nextAvailable}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        ${doctor.consultationFee}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full mt-4">Book Appointment</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Doctors
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
