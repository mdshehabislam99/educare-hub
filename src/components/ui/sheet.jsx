import React from "react";
import { cn } from "@/lib/utils";

const Sheet = ({ children }) => {
    return <div>{children}</div>;
};

const SheetTrigger = ({ children }) => {
    return <button>{children}</button>;
};

const SheetContent = ({ children, className, ...props }) => {
    return (
        <div className={cn("fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l bg-background p-6 shadow-lg transition ease-in-out sm:max-w-sm", className)} {...props}>
            {children}
        </div>
    );
};

const SheetHeader = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)

const SheetFooter = ({ className, ...props }) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription };
