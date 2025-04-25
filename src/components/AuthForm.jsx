import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

const AuthForm = () => {
  const [tabValue, setTabValue] = useState(0); // 0: Login, 1: Register
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "",
    role: "user" // Default role
  });
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseSnack = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url =
      tabValue === 0
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

    try {
      const res = await axios.post(url, formData, {
        withCredentials: true,
      });

      setSnack({
        open: true,
        message: res.data.message || (tabValue === 0 ? "Login successful!" : "Registration successful!"),
        severity: "success",
      });

      if (tabValue === 1) {
        setTabValue(0); // Switch to login tab after registration
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setSnack({
        open: true,
        message: err.response?.data?.message || "An error occurred",
        severity: "error",
      });
    }

    setLoading(false);
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google",
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );

      setSnack({
        open: true,
        message: res.data.message || "Google login successful!",
        severity: "success",
      });

      navigate("/dashboard");
    } catch (err) {
      setSnack({
        open: true,
        message: err.response?.data?.message || "Google login failed",
        severity: "error",
      });
    }
  };

  const handleGoogleLoginError = () => {
    setSnack({
      open: true,
      message: "Google login failed",
      severity: "error",
    });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {tabValue === 0 ? "Login" : "Register"}
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(e, val) => setTabValue(val)}
        variant="fullWidth"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      <AnimatePresence mode="wait">
        <MotionBox key={tabValue}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            {tabValue === 1 && (
              <>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
                
                {/* Role selection for registration */}
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  <FormHelperText>Select your account type</FormHelperText>
                </FormControl>
              </>
            )}

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : tabValue === 0 ? (
                "SIGN IN"
              ) : (
                "SIGN UP"
              )}
            </Button>

            <Typography align="center" mt={2}>
              OR
            </Typography>

            <Box display="flex" justifyContent="center">
             <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
            </Box>

            {tabValue === 0 && (
              <Typography align="center">
                Not a member?{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => setTabValue(1)}
                >
                  Register
                </span>
              </Typography>
            )}
          </Box>
        </MotionBox>
      </AnimatePresence>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthForm;