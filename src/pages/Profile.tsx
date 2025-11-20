// Add imports
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Inside component
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate("/");
  };

  // Inside the return JSX, replace static data:
  // ...
  <Avatar className="w-24 h-24 border-4 border-primary">
      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl font-bold">
        {user?.user_metadata?.full_name?.[0] || user?.email?.[0] || "G"}
      </AvatarFallback>
  </Avatar>
  <div className="flex-1">
      <h2 className="text-2xl font-bold gradient-text">
        {user?.user_metadata?.full_name || "Guest User"}
      </h2>
      <p className="text-muted-foreground">{user?.email || "guest@mentormind.app"}</p>
  </div>
  // ...
