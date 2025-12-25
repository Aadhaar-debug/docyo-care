import { Star, MapPin, Clock, DollarSign, Award, Calendar, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Doctor {
  id: string;
  name: string;
  speciality: string;
  location: string;
  fee: number;
  rating: number;
  reviews: number;
  availability: string;
  qualifications: string[];
  experience: number;
  image: string;
  bio: string;
  languages: string[];
  onlineConsultation: boolean;
}

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground">{doctor.speciality}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{doctor.experience} years experience</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="font-semibold text-sm">{doctor.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>

        {/* Qualifications */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Qualifications</p>
          <div className="flex flex-wrap gap-1">
            {doctor.qualifications.map((qual, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {qual}
              </Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <p className="text-xs font-semibold text-foreground mb-2">Languages</p>
          <div className="flex flex-wrap gap-1">
            {doctor.languages.map((lang, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location & Availability */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-border">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">{doctor.availability}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <DollarSign className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">₹{doctor.fee}/consultation</span>
          </div>
        </div>

        {/* Consultation Type */}
        <div className="flex gap-2">
          {doctor.onlineConsultation && (
            <Badge variant="default" className="text-xs bg-primary/80">
              Online Available
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            In-Clinic
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Book Appointment
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
