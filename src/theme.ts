import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#262626",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      light: "#262626",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#09090b",
      secondary: "#71717a",
    },
    divider: "#e4e4e7",
    grey: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      color: "#09090b",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      color: "#09090b",
    },
    h5: {
      fontWeight: 600,
      color: "#09090b",
    },
    h6: {
      fontWeight: 600,
      color: "#09090b",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          boxShadow: "none",
          border: "1px solid transparent",
          "&:hover": {
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
        },
        contained: {
          backgroundColor: "#09090b",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#18181b",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          },
        },
        outlined: {
          borderColor: "#e4e4e7",
          color: "#09090b",
          "&:hover": {
            borderColor: "#d4d4d8",
            backgroundColor: "#fafafa",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #e4e4e7",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            borderColor: "#d4d4d8",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#09090b",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderBottom: "1px solid #e4e4e7",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid #e4e4e7",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#e4e4e7",
            },
            "&:hover fieldset": {
              borderColor: "#d4d4d8",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#09090b",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#f4f4f5",
          color: "#09090b",
          border: "1px solid #e4e4e7",
        },
      },
    },
  },
});

export default theme;