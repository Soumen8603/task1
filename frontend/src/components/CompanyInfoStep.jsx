// frontend/src/components/CompanyInfoStep.jsx
import React from "react";
import { Card, CardContent, Box, TextField, Typography } from "@mui/material";

// This component was missing all the fields.
// We use the same 'setFields' prop as the social step.
export default function CompanyInfoStep({ fields, setFields }) {
  const handleChange = e => setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  // These names MUST match the 'initialData' in CompanyWizard.jsx
  const infoFields = [
    { name: "company_name", label: "Company Name" },
    { name: "about_company", label: "About Company", multiline: true, rows: 3 },
    { name: "industry_type", label: "Industry Type (e.g., 'Technology')" },
    { name: "organizations_type", label: "Organization Type (e.g., 'Private')" },
    { name: "team_size", label: "Team Size (e.g., '10-50')", type: "number" },
    { name: "company_website", label: "Company Website (e.g., https://...)" },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Company Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {infoFields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={fields[field.name] || ""}
              onChange={handleChange}
              type={field.type || "text"}
              multiline={field.multiline || false}
              rows={field.rows || 1}
              fullWidth
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}