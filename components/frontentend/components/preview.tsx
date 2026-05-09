"use client";
import { useMemo } from "react";

interface PreviewProps {
    value: string;
}
export const Preview = ({
    value
}: PreviewProps) => {
  return (
    <div 
      className="text-muted-foreground prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}
