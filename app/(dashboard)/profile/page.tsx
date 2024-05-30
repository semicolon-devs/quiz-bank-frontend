"use client";

import { useState } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from "@mui/icons-material/LockReset";
import FormHelperText from "@mui/material/FormHelperText";
import { IconButton, Input, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { RootState, useAppSelector } from "@/store";

import SectionTitle from "@/components/sectionTitle";

import { BASE_URL } from "@/config/apiConfig";
import { UrlSlugType } from "@/utils/enums/UrlSlug";
import { clearUserDetails } from "@/store/authSlice";
import { clearAuthToken, getAccess } from "@/helpers/token";

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
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ProfilePage() {
  const [userDetailsFieldsEditable, setUserDetailsFieldsEditable] =
    useState<boolean>(false);
  const [passwordFieldsEditable, setPasswordFieldsEditable] =
    useState<boolean>(false);
  const [showPasswords, setShowPasswords] = useState<boolean>(false);

  const handleClickShowPasswords = () => setShowPasswords((show) => !show);

  const handleMouseDownPasswords = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const { userDetails } = useAppSelector((state: RootState) => state.auth);

  const router = useRouter();

  const updateUserDetails = (values: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    const axiosConfig = {
      method: "PATCH",
      url: `${BASE_URL}auth`,
      data: {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        toast.success("Profile details were updated successfully");
        clearUserDetails();
        clearAuthToken();
        router.push(UrlSlugType.LOGIN);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const updatePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    const accessToken = await getAccess();

    const axiosConfig = {
      method: "POST",
      url: `${BASE_URL}auth/reset-password`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        password: values.currentPassword,
        newPassword: values.newPassword,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        toast.success("Password was updated successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {});
  };

  const userDetailsFormik = useFormik({
    initialValues: {
      firstname: userDetails?.firstname ?? "",
      lastname: userDetails?.lastname ?? "",
      email: userDetails?.email ?? "",
    },
    validationSchema: userDetailsValidationSchema,
    onSubmit: (values) => {
      updateUserDetails(values);
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
      updatePassword(values);
    },
  });

  return (
    <>
      <SectionTitle title="Profile Settings" />
      <Grid container spacing={2}>
        <Grid xs={6} xl={12}>
          <Paper sx={customStyles.paper}>
            <Grid container spacing={1} justifyContent="flex-end">
              <Grid xs={12} display={"flex"} justifyContent={"end"} gap={2}>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                  disabled={userDetailsFieldsEditable}
                  onClick={() => setUserDetailsFieldsEditable(true)}
                >
                  Edit profile details
                </Button>
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
              {userDetailsFieldsEditable && (
                <>
                  <Grid xs={12}>
                    <Typography
                      variant="caption"
                      display="block"
                      align="right"
                      sx={{ fontStyle: "italic", color: "#C5100D" }}
                    >
                      Once changes are saved, you will be redirected to the
                      login page
                    </Typography>
                  </Grid>
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
                </>
              )}
            </Grid>
          </Paper>
        </Grid>
        <Grid xs={6} xl={12}>
          {passwordFieldsEditable && (
            <Paper sx={customStyles.paper}>
              <Grid container spacing={2} justifyContent="flex-end">
                <Grid xs={3}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Current password
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords ? "text" : "password"}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPasswords}
                        >
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={updatePasswordFormik.values.currentPassword}
                    onChange={updatePasswordFormik.handleChange}
                    onBlur={updatePasswordFormik.handleBlur}
                    error={
                      updatePasswordFormik.touched.currentPassword &&
                      Boolean(updatePasswordFormik.errors.currentPassword)
                    }
                    disabled={!passwordFieldsEditable}
                  />
                  {updatePasswordFormik.touched.currentPassword &&
                    updatePasswordFormik.errors.currentPassword && (
                      <FormHelperText sx={{ color: "red" }}>
                        {updatePasswordFormik.errors.currentPassword}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={3}>
                  <Typography variant="overline" display="block" gutterBottom>
                    New password
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords ? "text" : "password"}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPasswords}
                        >
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={updatePasswordFormik.values.newPassword}
                    onChange={updatePasswordFormik.handleChange}
                    onBlur={updatePasswordFormik.handleBlur}
                    error={
                      updatePasswordFormik.touched.newPassword &&
                      Boolean(updatePasswordFormik.errors.newPassword)
                    }
                    disabled={!passwordFieldsEditable}
                  />
                  {updatePasswordFormik.touched.newPassword &&
                    updatePasswordFormik.errors.newPassword && (
                      <FormHelperText sx={{ color: "red" }}>
                        {updatePasswordFormik.errors.newPassword}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid xs={3}>
                  <Typography variant="overline" display="block" gutterBottom>
                    Confirm password
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords ? "text" : "password"}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPasswords}
                        >
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={updatePasswordFormik.values.confirmPassword}
                    onChange={updatePasswordFormik.handleChange}
                    onBlur={updatePasswordFormik.handleBlur}
                    error={
                      updatePasswordFormik.touched.confirmPassword &&
                      Boolean(updatePasswordFormik.errors.confirmPassword)
                    }
                    disabled={!passwordFieldsEditable}
                  />
                  {updatePasswordFormik.touched.confirmPassword &&
                    updatePasswordFormik.errors.confirmPassword && (
                      <FormHelperText sx={{ color: "red" }}>
                        {updatePasswordFormik.errors.confirmPassword}
                      </FormHelperText>
                    )}
                </Grid>
              </Grid>

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
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
}
