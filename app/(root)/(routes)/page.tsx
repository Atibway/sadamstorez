"use client";
import { Model } from "@/components/ui/Model";
import { Button } from "@/components/ui/button";
import { useStoreModel } from "@/hooks/use-store-model";
import { useEffect } from "react";

export default function SetupPage() {
  const onOpen = useStoreModel((state) => state.onOpen);
  const isOpen = useStoreModel((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  return null;
}
