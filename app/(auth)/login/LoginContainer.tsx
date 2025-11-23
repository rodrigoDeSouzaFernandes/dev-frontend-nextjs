import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoginForm from "./LoginForm";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

export default function LoginContainer() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md relative gap-4">
        <CardHeader>
          <CardTitle className="text-4xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 ">
          <LoginForm />
          <Separator className="my-4" />

          <div className="text-center text-sm text-muted-foreground">
            <p className="inline">Don't have an account? </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <a className="text-primary underline">Sign up</a>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <Alert className="p-4">
                  <AlertCircleIcon className="mt-1" />
                  <AlertTitle className="mb-2 text-lg">
                    Use these credentials to login:
                  </AlertTitle>
                  <AlertDescription>
                    <strong>Username:</strong> mor_2314
                  </AlertDescription>
                  <AlertDescription>
                    <strong>Password:</strong> 83r5^_
                  </AlertDescription>
                </Alert>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
