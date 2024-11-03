import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#232f3e", // Amazon's dark blue/navy
      light: "#37475A", // Lighter navy for hover states
      dark: "#191E26", // Darker navy
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FF9900", // Amazon's orange
      light: "#FFB266", // Lighter orange
      dark: "#CC7A00", // Darker orange
      contrastText: "#000000",
    },
    error: {
      main: "#B12704", // Amazon's red for errors/alerts
    },
    success: {
      main: "#067D62", // Amazon's green for success messages
    },
    background: {
      default: "#EAEDED", // Light gray background
      paper: "#FFFFFF", // White background for cards/papers
    },
    text: {
      primary: "#0F1111", // Amazon's black for primary text
      secondary: "#565959", // Gray for secondary text
    },
    divider: "#DDD", // Light gray for dividers
    action: {
      hover: "rgba(255, 153, 0, 0.08)", // Orange tint for hover states
      selected: "rgba(255, 153, 0, 0.16)", // Darker orange tint for selected states
    },
  },
  typography: {
    fontFamily: [
      "Amazon Ember",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#232f3e", // Dark blue background for sidebar
          color: "#ffffff",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#FF9900",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#FFB266",
            },
            "& .MuiListItemIcon-root": {
              color: "#000000",
            },
          },
          "&:hover": {
            backgroundColor: "#37475A",
            color: "#ffffff",
            "& .MuiListItemIcon-root": {
              color: "#ffffff",
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: "#FF9900",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#FFB266",
          },
        },
        outlinedPrimary: {
          borderColor: "#FF9900",
          color: "#FF9900",
          "&:hover": {
            borderColor: "#FFB266",
            backgroundColor: "rgba(255, 153, 0, 0.04)",
          },
        },
      },
    },
  },
});
