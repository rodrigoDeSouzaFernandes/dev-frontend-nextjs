import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";

type ErrorAlertProps = {
  variant?: "default" | "destructive" | null | undefined;
  title?: string;
  description?: string;
};

export default function CustomAlert({
  variant,
  title,
  description,
}: ErrorAlertProps) {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
