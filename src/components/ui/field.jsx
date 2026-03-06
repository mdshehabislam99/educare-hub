import React from "react";
import { cn } from "@/lib/utils";

const FieldGroup = ({ className, ...props }) => {
    return (
        <div
            className={cn("grid gap-4", className)}
            {...props}
        />
    );
};

const Field = ({ className, ...props }) => {
    return (
        <div
            className={cn("grid gap-2", className)}
            {...props}
        />
    );
};

const FieldLabel = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    );
});
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        />
    );
});
FieldDescription.displayName = "FieldDescription";

export { FieldGroup, Field, FieldLabel, FieldDescription };
