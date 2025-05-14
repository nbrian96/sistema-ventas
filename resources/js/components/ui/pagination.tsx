import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    links: PaginationLink[];
    onPageChange: (url: string) => void;
}

export function Pagination({ links, onPageChange, className, ...props }: PaginationProps) {
    return (
        <div className={cn("flex flex-wrap gap-2", className)} {...props}>
            {links.map((link, i) => (
                <Button
                    key={i}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && onPageChange(link.url)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    )
}