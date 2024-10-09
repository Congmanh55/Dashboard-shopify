import React, { useState } from "react";
import { Select, TextField, Box } from "@shopify/polaris";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/en";
dayjs.extend(isSameOrBefore);

type FilterOption = 7 | 10 | 30;

interface DateRangeWithFiltersProps {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    onDateChange: (start: Dayjs | null, end: Dayjs | null) => void;
}

const DateRange: React.FC<DateRangeWithFiltersProps> = ({
    startDate,
    endDate,
    onDateChange,
}) => {
    const handleFilterChange = (days: FilterOption): void => {
        const newStartDate = dayjs().subtract(days, "day");
        const newEndDate = dayjs();
        onDateChange(newStartDate, newEndDate);
    };

    const filterOptions = [
        { label: "Last 7 days", value: "7" },
        { label: "Last 10 days", value: "10" },
        { label: "Last 1 month", value: "30" },
    ];

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: "max-content" }}>
                <Select
                    label=""
                    options={filterOptions}
                    value={String(dayjs().diff(startDate, "day"))}
                    onChange={(value) =>
                        handleFilterChange(Number(value) as FilterOption)
                    }
                    labelHidden={true}
                />
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <TextField
                    label=""
                    type="date"
                    value={startDate?.format("YYYY-MM-DD") || ""}
                    onChange={(value) => onDateChange(dayjs(value), endDate)}
                    autoComplete="off"
                    max={dayjs().format("YYYY-MM-DD")}
                />
                <span>-</span>
                <TextField
                    label=""
                    type="date"
                    value={endDate?.format("YYYY-MM-DD") || ""}
                    onChange={(value) => onDateChange(startDate, dayjs(value))}
                    autoComplete="off"
                    max={dayjs().format("YYYY-MM-DD")}
                />
            </div>
        </div>
    );
};

export default DateRange;
