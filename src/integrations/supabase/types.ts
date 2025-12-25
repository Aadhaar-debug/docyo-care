export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      doctors: {
        Row: {
          accepts_online: boolean | null
          availability: Json | null
          city: string | null
          clinic_address: string | null
          clinic_name: string | null
          consultation_fee: number | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          id: string
          is_verified: boolean | null
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          profile_image: string | null
          qualification: string | null
          rating: number | null
          specialization: string
          total_reviews: number | null
          updated_at: string | null
        }
        Insert: {
          accepts_online?: boolean | null
          availability?: Json | null
          city?: string | null
          clinic_address?: string | null
          clinic_name?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          profile_image?: string | null
          qualification?: string | null
          rating?: number | null
          specialization: string
          total_reviews?: number | null
          updated_at?: string | null
        }
        Update: {
          accepts_online?: boolean | null
          availability?: Json | null
          city?: string | null
          clinic_address?: string | null
          clinic_name?: string | null
          consultation_fee?: number | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          id?: string
          is_verified?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          profile_image?: string | null
          qualification?: string | null
          rating?: number | null
          specialization?: string
          total_reviews?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      health_reminders: {
        Row: {
          created_at: string | null
          description: string | null
          frequency: string | null
          id: string
          is_active: boolean | null
          next_reminder_at: string | null
          reminder_type: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          next_reminder_at?: string | null
          reminder_type: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          frequency?: string | null
          id?: string
          is_active?: boolean | null
          next_reminder_at?: string | null
          reminder_type?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lifestyle: {
        Row: {
          activity_level: Database["public"]["Enums"]["activity_level"] | null
          alcohol_status: Database["public"]["Enums"]["alcohol_status"] | null
          created_at: string | null
          diet_type: Database["public"]["Enums"]["diet_type"] | null
          id: string
          sleep_hours_avg: number | null
          smoking_status: Database["public"]["Enums"]["smoking_status"] | null
          stress_level: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          alcohol_status?: Database["public"]["Enums"]["alcohol_status"] | null
          created_at?: string | null
          diet_type?: Database["public"]["Enums"]["diet_type"] | null
          id?: string
          sleep_hours_avg?: number | null
          smoking_status?: Database["public"]["Enums"]["smoking_status"] | null
          stress_level?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["activity_level"] | null
          alcohol_status?: Database["public"]["Enums"]["alcohol_status"] | null
          created_at?: string | null
          diet_type?: Database["public"]["Enums"]["diet_type"] | null
          id?: string
          sleep_hours_avg?: number | null
          smoking_status?: Database["public"]["Enums"]["smoking_status"] | null
          stress_level?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      medical_history: {
        Row: {
          allergies: string[] | null
          blood_type: string | null
          chronic_illnesses: string[] | null
          created_at: string | null
          current_medications: Json | null
          family_history: Json | null
          id: string
          past_surgeries: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          allergies?: string[] | null
          blood_type?: string | null
          chronic_illnesses?: string[] | null
          created_at?: string | null
          current_medications?: Json | null
          family_history?: Json | null
          id?: string
          past_surgeries?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          allergies?: string[] | null
          blood_type?: string | null
          chronic_illnesses?: string[] | null
          created_at?: string | null
          current_medications?: Json | null
          family_history?: Json | null
          id?: string
          past_surgeries?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      medical_reports: {
        Row: {
          created_at: string | null
          description: string | null
          doctor_name: string | null
          facility_name: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          report_date: string | null
          report_type: Database["public"]["Enums"]["report_type"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          doctor_name?: string | null
          facility_name?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          report_date?: string | null
          report_type?: Database["public"]["Enums"]["report_type"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          doctor_name?: string | null
          facility_name?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          report_date?: string | null
          report_type?: Database["public"]["Enums"]["report_type"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          full_name: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          height_cm: number | null
          id: string
          onboarding_completed: boolean | null
          onboarding_step: number | null
          phone: string | null
          updated_at: string | null
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      vitals: {
        Row: {
          blood_sugar: number | null
          created_at: string | null
          diastolic_bp: number | null
          heart_rate: number | null
          id: string
          notes: string | null
          oxygen_saturation: number | null
          recorded_at: string | null
          systolic_bp: number | null
          temperature: number | null
          user_id: string
        }
        Insert: {
          blood_sugar?: number | null
          created_at?: string | null
          diastolic_bp?: number | null
          heart_rate?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          recorded_at?: string | null
          systolic_bp?: number | null
          temperature?: number | null
          user_id: string
        }
        Update: {
          blood_sugar?: number | null
          created_at?: string | null
          diastolic_bp?: number | null
          heart_rate?: number | null
          id?: string
          notes?: string | null
          oxygen_saturation?: number | null
          recorded_at?: string | null
          systolic_bp?: number | null
          temperature?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_level:
        | "sedentary"
        | "lightly_active"
        | "moderately_active"
        | "very_active"
        | "extremely_active"
      alcohol_status: "never" | "occasional" | "moderate" | "heavy"
      diet_type:
        | "omnivore"
        | "vegetarian"
        | "vegan"
        | "pescatarian"
        | "keto"
        | "paleo"
        | "other"
      gender_type: "male" | "female" | "other" | "prefer_not_to_say"
      report_type:
        | "lab_report"
        | "prescription"
        | "scan"
        | "x_ray"
        | "mri"
        | "ct_scan"
        | "ultrasound"
        | "other"
      smoking_status: "never" | "former" | "current" | "occasional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_level: [
        "sedentary",
        "lightly_active",
        "moderately_active",
        "very_active",
        "extremely_active",
      ],
      alcohol_status: ["never", "occasional", "moderate", "heavy"],
      diet_type: [
        "omnivore",
        "vegetarian",
        "vegan",
        "pescatarian",
        "keto",
        "paleo",
        "other",
      ],
      gender_type: ["male", "female", "other", "prefer_not_to_say"],
      report_type: [
        "lab_report",
        "prescription",
        "scan",
        "x_ray",
        "mri",
        "ct_scan",
        "ultrasound",
        "other",
      ],
      smoking_status: ["never", "former", "current", "occasional"],
    },
  },
} as const
