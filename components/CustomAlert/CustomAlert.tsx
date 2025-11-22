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
}: CustomAlertProps) {
  return (
    <Alert data-testid="custom-alert" variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
