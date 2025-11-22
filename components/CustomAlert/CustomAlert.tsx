import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

export type CustomAlertProps = {
  variant?: "default" | "destructive" | null | undefined;
  title?: string;
  description?: string;
};

export default function CustomAlert({
  variant,
  title,
  description,
}: CustomAlertProps): React.ReactElement {
  return (
    <Alert data-testid="custom-alert" variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
