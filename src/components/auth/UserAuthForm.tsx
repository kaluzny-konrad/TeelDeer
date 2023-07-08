"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className, ...props }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description:
          "There was a problem logging in with Google. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex justify-center", className)}
      {...props}
      data-testid="user-auth-form"
    >
      <Button onClick={loginWithGoogle} size="sm" className="w-full">
        Google
      </Button>
    </div>
  );
}
