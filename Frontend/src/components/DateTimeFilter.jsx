"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { options } from "@/lib/data"

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {/* BUTTON */}
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-[180px] justify-between"
                >
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {options.find((o) => o.value === dateQuery)?.label || options[0].label}
                    </span>

                    <ChevronsUpDown className="w-4 h-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            {/* DROPDOWN */}
            <PopoverContent className="w-[180px] p-0">
                <Command>
                    <CommandInput placeholder="Filter time..." />

                    <CommandEmpty>No result.</CommandEmpty>

                    <CommandList>
                        <CommandGroup>
                            {options.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setDateQuery(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {item.label}

                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            dateQuery === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default DateTimeFilter