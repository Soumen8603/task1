import React from "react";
import { Card, CardContent, Box, TextField } from "@mui/material";

export default function CompanySocialStep({ fields, setFields }) {
  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {["linkedin", "facebook", "twitter", "instagram", "youtube"].map(field =>
            <TextField
              key={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={fields[field]}
              onChange={handleChange}
              fullWidth
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
