"use client";
import React from "react";

import Heading from "@/components/ui1/Heading";
import { Separator } from "@/components/ui1/separator";
import { ApiAlert } from "@/components/ui1/api-alert";
import { useOrigin } from "@/hooks/use-origin";

const SettingsForm: React.FC = () => {
  const origin = useOrigin();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="App Settings" description="Manage application preferences" />
      </div>
      <Separator />
      <div className="space-y-6 py-4">
        <p className="text-sm text-muted-foreground">
          This is a single-store application. Further app-level settings (theme, notifications, etc.) can be added here.
        </p>
      </div>
      <Separator />
      <ApiAlert
        variant="public"
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api`}
      />
    </>
  );
};

export default SettingsForm;
