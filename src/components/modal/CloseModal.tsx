"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function CloseModal() {
  const router = useRouter();

  return (
    <Button
      data-testid="close-modal"
      aria-label="close modal"
      onClick={() => router.back()}
    >
      <X />
    </Button>
  );
}
