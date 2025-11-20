"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button className="w-full mt-4">Login</Button>

          <Separator className="my-4" />

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary underline">
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
