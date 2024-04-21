"use client";

import { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { RootState, useAppSelector } from "@/store";

import SectionTitle from "@/components/sectionTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";

const customStyles = {
  paper: {
    p: 2,
    gap: 2,
  },
};

const userDetailsValidationSchema = yup.object({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const updatePasswordValidationSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "New password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ProfilePage() {
  const [userDetailsFieldsEditable, setUserDetailsFieldsEditable] =
    useState<boolean>(false);
  const [passwordFieldsEditable, setPasswordFieldsEditable] =
    useState<boolean>(false);

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  const userDetailsFormik = useFormik({
    initialValues: {
      firstname: userDetails?.firstname,
      lastname: userDetails?.lastname,
      email: userDetails?.email,
    },
    validationSchema: userDetailsValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const updatePasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <SectionTitle title="Profile Settings" />
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Paper sx={customStyles.paper}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid xs={12} display={"flex"} justifyContent={"end"}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                  disabled={userDetailsFieldsEditable}
                  onClick={() => setUserDetailsFieldsEditable(true)}
                >
                  Edit
                </Button>
              </Grid>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  First Name
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="firstname"
                  name="firstname"
                  // label="First name"
                  value={userDetailsFormik.values.firstname}
                  onChange={userDetailsFormik.handleChange}
                  onBlur={userDetailsFormik.handleBlur}
                  error={
                    userDetailsFormik.touched.firstname &&
                    Boolean(userDetailsFormik.errors.firstname)
                  }
                  helperText={
                    userDetailsFormik.touched.firstname &&
                    userDetailsFormik.errors.firstname
                  }
                  disabled={!userDetailsFieldsEditable}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  Last Name
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="lastname"
                  name="lastname"
                  // label="Last name"
                  value={userDetailsFormik.values.lastname}
                  onChange={userDetailsFormik.handleChange}
                  onBlur={userDetailsFormik.handleBlur}
                  error={
                    userDetailsFormik.touched.lastname &&
                    Boolean(userDetailsFormik.errors.lastname)
                  }
                  helperText={
                    userDetailsFormik.touched.lastname &&
                    userDetailsFormik.errors.lastname
                  }
                  disabled={!userDetailsFieldsEditable}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  Email
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="email"
                  name="email"
                  // label="Email"
                  value={userDetailsFormik.values.email}
                  onChange={userDetailsFormik.handleChange}
                  onBlur={userDetailsFormik.handleBlur}
                  error={
                    userDetailsFormik.touched.email &&
                    Boolean(userDetailsFormik.errors.email)
                  }
                  helperText={
                    userDetailsFormik.touched.email &&
                    userDetailsFormik.errors.email
                  }
                  disabled={!userDetailsFieldsEditable}
                />
              </Grid>
            </Grid>
            {userDetailsFieldsEditable && (
              <Grid container spacing={2} mt={2}>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setUserDetailsFieldsEditable(false)}
                  >
                    cancel
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={userDetailsFormik.submitForm}
                  >
                    Save changes
                  </Button>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid xs={6}>
          <Paper sx={customStyles.paper}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid xs={12} display={"flex"} justifyContent={"end"}>
                <Button
                  variant="outlined"
                  startIcon={<LockResetIcon />}
                  size="small"
                  disabled={passwordFieldsEditable}
                  onClick={() => setPasswordFieldsEditable(true)}
                >
                  Update password
                </Button>
              </Grid>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  Current password
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="currentPassword"
                  name="currentPassword"
                  // label="First name"
                  value={updatePasswordFormik.values.currentPassword}
                  onChange={updatePasswordFormik.handleChange}
                  onBlur={updatePasswordFormik.handleBlur}
                  error={
                    updatePasswordFormik.touched.currentPassword &&
                    Boolean(updatePasswordFormik.errors.currentPassword)
                  }
                  helperText={
                    updatePasswordFormik.touched.currentPassword &&
                    updatePasswordFormik.errors.currentPassword
                  }
                  disabled={!passwordFieldsEditable}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  New password
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  // label="Last name"
                  value={updatePasswordFormik.values.newPassword}
                  onChange={updatePasswordFormik.handleChange}
                  onBlur={updatePasswordFormik.handleBlur}
                  error={
                    updatePasswordFormik.touched.newPassword &&
                    Boolean(updatePasswordFormik.errors.newPassword)
                  }
                  helperText={
                    updatePasswordFormik.touched.newPassword &&
                    updatePasswordFormik.errors.newPassword
                  }
                  disabled={!passwordFieldsEditable}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid xs={3}>
                <Typography variant="overline" display="block" gutterBottom>
                  Confirm password
                </Typography>
              </Grid>
              <Grid xs={9}>
                <TextField
                  variant="standard"
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  // label="Last name"
                  value={updatePasswordFormik.values.confirmPassword}
                  onChange={updatePasswordFormik.handleChange}
                  onBlur={updatePasswordFormik.handleBlur}
                  error={
                    updatePasswordFormik.touched.confirmPassword &&
                    Boolean(updatePasswordFormik.errors.confirmPassword)
                  }
                  helperText={
                    updatePasswordFormik.touched.confirmPassword &&
                    updatePasswordFormik.errors.confirmPassword
                  }
                  disabled={!passwordFieldsEditable}
                />
              </Grid>
            </Grid>
            {passwordFieldsEditable && (
              <Grid container spacing={2} mt={2}>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setPasswordFieldsEditable(false)}
                  >
                    cancel
                  </Button>
                </Grid>
                <Grid xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={updatePasswordFormik.submitForm}
                  >
                    Update password
                  </Button>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
