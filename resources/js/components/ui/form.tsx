import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "./label"
import { Input } from "./input"
import { Alert, AlertDescription } from "./alert"
import { AlertCircle } from "lucide-react"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    description?: string;
}

export function FormField({
    label,
    error,
    description,
    className,
    ...props
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={props.id}>{label}</Label>
            <Input
                className={cn(
                    error && "border-destructive focus-visible:ring-destructive",
                    className
                )}
                {...props}
            />
            {error && (
                <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {description && !error && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    )
}

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Form({
    className,
    children,
    ...props
}: FormProps) {
    return (
        <form
            className={cn("space-y-6", className)}
            {...props}
        >
            {children}
        </form>
    )
}