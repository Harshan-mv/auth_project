import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Box, Typography, Button, CircularProgress, 
  Container, Divider, Paper, Snackbar, Alert, Chip, Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import FavoriteNumberInput from "./FavoriteNumberInput";
import CookieConsent from "./CookieConsent";
import { 
  getCookieConsent, setCookieConsent, 
  getPreferences, savePreferences 
} from "../utils/cookieUtils";

// Theme configuration
const themeStyles = {
  light: { backgroundColor: '#ffffff', color: '#000000' },
  dark: { backgroundColor: '#121212', color: '#ffffff' },
  blue: { backgroundColor: '#e3f2fd', color: '#000000' },
  green: { backgroundColor: '#e8f5e9', color: '#000000' }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // User preferences
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  
  // Cookie consent state
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Fetch user info and load preferences on mount
  useEffect(() => {
    const fetchUserAndPreferences = async () => {
      try {
        // Fetch user data
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
        
        // Check if cookies are accepted - use user ID for personalized cookies
        const userId = res.data.id || res.data._id; // Adjust based on your user object structure
        const hasConsent = getCookieConsent(userId);
        
        // If cookie consent is explicitly true, load preferences
        if (hasConsent === true) {
          const savedPreferences = getPreferences(userId);
          if (savedPreferences) {
            setLanguage(savedPreferences.language || 'en');
            setTheme(savedPreferences.theme || 'light');
            setFavoriteNumber(savedPreferences.favoriteNumber || 7);
          }
        } 
        // Otherwise, for new users or those who haven't decided yet, show the consent popup
        else {
          setShowCookieConsent(true);
        }
      } catch (err) {
        console.error("Unauthorized or error fetching user:", err);
        navigate("/"); // Redirect to login if not authorized
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPreferences();
  }, [navigate]);

  // Get user ID helper function
  const getUserId = () => {
    return user && (user.id || user._id);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", null, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleNavigateToCards = () => {
    // Simple navigation without any conditions
    navigate("/cards");
  };

  const handleSavePreferences = () => {
    const userId = getUserId();
    if (getCookieConsent(userId)) {
      const preferences = { language, theme, favoriteNumber };
      savePreferences(preferences, userId);
      setShowSaveSuccess(true);
      
      // Don't navigate automatically - let the user decide when to go to cards
      // Instead, just show the success message
    } else {
      setShowCookieConsent(true);
    }
  };
  
  const handleAcceptCookies = () => {
    const userId = getUserId();
    setCookieConsent(true, userId);
    setShowCookieConsent(false);
    // Save current preferences after accepting cookies
    const preferences = { language, theme, favoriteNumber };
    savePreferences(preferences, userId);
    setShowSaveSuccess(true);
  };

  const handleDeclineCookies = () => {
    const userId = getUserId();
    // Explicitly set cookie consent to false, not just undefined
    setCookieConsent(false, userId);
    setShowCookieConsent(false);
    // We don't save preferences if cookies are declined
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  // Apply current theme
  const currentThemeStyle = themeStyles[theme] || themeStyles.light;

  // Get current cookie consent status
  const cookiesAccepted = getCookieConsent(getUserId());

  // Check if user is admin
  const isAdmin = user && user.role === 'admin';

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 5, 
          p: 4, 
          borderRadius: 2, 
          ...currentThemeStyle 
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
          </Typography>
          
          {/* Role badge */}
          <Chip 
            label={user?.role?.toUpperCase() || 'USER'} 
            color={isAdmin ? 'error' : 'primary'}
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        {user && (
          <>
            {/* Welcome message with role-based greeting */}
            <Box sx={{ mb: 3, p: 2, bgcolor: isAdmin ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 0, 255, 0.1)', borderRadius: 1 }}>
              <Typography variant="h5">
                {isAdmin ? 'Welcome Admin:' : 'Welcome:'} {user.name}
              </Typography>
              <Typography variant="subtitle1">Email: {user.email}</Typography>
            </Box>
            
            {/* Quick Action Buttons */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    fullWidth
                    onClick={handleNavigateToCards}
                    sx={{ py: 2 }}
                  >
                    Go to My Cards
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    onClick={() => navigate("/purchases")}
                    sx={{ py: 2 }}
                  >
                    View Purchase History
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" gutterBottom>Your Preferences</Typography>
            
            <LanguageSelector language={language} setLanguage={setLanguage} />
            
            <ThemeSelector theme={theme} setTheme={setTheme} />
            
            <FavoriteNumberInput 
              favoriteNumber={favoriteNumber} 
              setFavoriteNumber={setFavoriteNumber} 
            />
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSavePreferences}
              >
                Save Preferences
              </Button>
              
              <Button 
                variant="contained" 
                color="error" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
            
            {cookiesAccepted === false && (
              <Alert severity="info" sx={{ mt: 3 }}>
                Cookie storage is currently disabled. Your preferences won't be saved.
                <Button 
                  size="small" 
                  sx={{ ml: 2 }} 
                  onClick={() => setShowCookieConsent(true)}
                >
                  Enable Cookies
                </Button>
              </Alert>
            )}
          </>
        )}
      </Paper>
      
      {/* Cookie Consent Popup */}
      {showCookieConsent && (
        <CookieConsent 
          onAccept={handleAcceptCookies} 
          onDecline={handleDeclineCookies} 
        />
      )}
      
      {/* Success Notification */}
      <Snackbar 
        open={showSaveSuccess} 
        autoHideDuration={3000} 
        onClose={() => setShowSaveSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Preferences saved successfully! 
          <Button 
            size="small" 
            color="inherit" 
            onClick={handleNavigateToCards} 
            sx={{ ml: 2 }}
          >
            Go to Cards
          </Button>
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;