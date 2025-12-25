import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, FileText, Heart, TrendingUp, Plus, LogOut, User, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [vitals, setVitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profileData && !profileData.onboarding_completed) {
        navigate("/onboarding");
        return;
      }

      setProfile(profileData);

      const { data: vitalsData } = await supabase
        .from("vitals")
        .select("*")
        .eq("user_id", session.user.id)
        .order("recorded_at", { ascending: false })
        .limit(5);

      setVitals(vitalsData || []);
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };

  const calculateBMI = () => {
    if (profile?.height_cm && profile?.weight_kg) {
      const heightM = Number(profile.height_cm) / 100;
      return (Number(profile.weight_kg) / (heightM * heightM)).toFixed(1);
    }
    return "--";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const latestVital = vitals[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSignOut}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">
            Welcome back, <span className="text-gradient">{profile?.full_name?.split(" ")[0] || "User"}</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your health overview for today
          </p>
        </motion.div>

        {/* Health Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">BMI</p>
                    <p className="text-3xl font-bold mt-1">{calculateBMI()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="text-3xl font-bold mt-1">
                      {latestVital?.systolic_bp && latestVital?.diastolic_bp
                        ? `${latestVital.systolic_bp}/${latestVital.diastolic_bp}`
                        : "--/--"}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="text-3xl font-bold mt-1">
                      {latestVital?.heart_rate || "--"} <span className="text-lg font-normal">bpm</span>
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card variant="gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reports</p>
                    <p className="text-3xl font-bold mt-1">0</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="secondary">
                <Plus className="w-4 h-4 mr-2" /> Record New Vitals
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                <FileText className="w-4 h-4 mr-2" /> Upload Medical Report
              </Button>
              <Button className="w-full justify-start" variant="secondary">
                <Calendar className="w-4 h-4 mr-2" /> Schedule Reminder
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Recent Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {vitals.length > 0 ? (
                <div className="space-y-3">
                  {vitals.slice(0, 3).map((vital) => (
                    <div key={vital.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm text-muted-foreground">
                        {new Date(vital.recorded_at).toLocaleDateString()}
                      </span>
                      <div className="flex gap-4 text-sm">
                        {vital.heart_rate && <span>{vital.heart_rate} bpm</span>}
                        {vital.systolic_bp && <span>{vital.systolic_bp}/{vital.diastolic_bp}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No vitals recorded yet. Start tracking your health!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
