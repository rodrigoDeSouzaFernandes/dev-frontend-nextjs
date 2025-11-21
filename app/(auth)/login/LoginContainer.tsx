import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import LoginForm from "./LoginForm";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginContainer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md relative gap-4">
        <CardHeader>
          <CardTitle className="text-4xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 ">
          <LoginForm />
          <Separator className="my-4" />

          <div className="text-center text-sm text-muted-foreground">
            <p className="inline">Don't have an account? </p>
            <Tooltip>
              <TooltipTrigger>
                <a className="text-primary underline">Sign up</a>
              </TooltipTrigger>
              <TooltipContent>
                <Alert className="p-4">
                  <AlertCircleIcon className="mt-1" />
                  <AlertTitle className="mb-2 text-lg">
                    Use these credentials to login:
                  </AlertTitle>
                  <AlertDescription>
                    <strong>E-mail:</strong> admin@admin.com
                  </AlertDescription>
                  <AlertDescription>
                    <strong>Password:</strong> admin
                  </AlertDescription>
                </Alert>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
