import { motion } from "framer-motion";
import {
  FileText,
  Activity,
  Clock,
  Shield,
  Users,
  Download,
  Bell,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Medical Records Storage",
    description:
      "Upload and organize prescriptions, lab reports, X-rays, MRIs, and all your medical documents in one secure place.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Activity,
    title: "Vitals Tracking",
    description:
      "Log blood pressure, heart rate, blood sugar, and other vitals. Visualize trends over time with interactive charts.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Clock,
    title: "Health Timeline",
    description:
      "View your complete medical history chronologically. Track diagnoses, treatments, and health events at a glance.",
    color: "text-info",
    bgColor: "bg-info/10",
  },
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your data is protected with 256-bit encryption, HIPAA compliance, and strict access controls.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Users,
    title: "Doctor Sharing",
    description:
      "Generate secure, read-only links to share your health profile with healthcare providers instantly.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Download,
    title: "Export Anytime",
    description:
      "Download your complete health summary as a PDF document, ready for doctor visits or insurance claims.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description:
      "Never miss a medication, follow-up appointment, or health checkup with personalized reminders.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Stethoscope,
    title: "Find Doctors",
    description:
      "Discover verified doctors near you, filter by specialty, and view ratings and availability.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Everything You Need for{" "}
            <span className="text-gradient">Complete Health Management</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            From storing medical records to tracking vitals, Docyo gives you the
            tools to take control of your healthcare journey.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 rounded-xl border border-border bg-card hover:shadow-elevated transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
              
              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
