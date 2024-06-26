import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useAppContext } from "@/context/AppContext";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ value, handleChange }: any) {
  const { setTabValue } = useAppContext();
  setTabValue(value);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 100,
        paddingLeft: 4,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderLeft: 1,
          borderColor: "divider",
          textAlign: "left",
          paddingLeft: 1,
        }}
      >
        <Tab
          label="MarketPlace"
          {...a11yProps(0)}
          sx={{
            textTransform: "capitalize",
            fontSize: 16,
            textAlign: "left",
            "&.Mui-selected": { bgcolor: "transparent" },
          }}
        />
        <Tab
          label="Ads"
          {...a11yProps(1)}
          sx={{
            textTransform: "capitalize",
            fontSize: 16,
            textAlign: "left",
            "&.Mui-selected": { bgcolor: "transparent" },
          }}
        />
      </Tabs>
    </Box>
  );
}
