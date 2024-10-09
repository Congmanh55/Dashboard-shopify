import React, { useMemo, useState } from "react";
import DateRange from "../../components/DateRange";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Box, Text } from "@shopify/polaris";
import dayjs, { Dayjs } from "dayjs";

const Dashboard = () => {
    const [startDate, setStartDate] = useState<Dayjs | null>(
        dayjs().subtract(7, "day")
    );
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const data = [
        { time: "2024-09-23", dataset: 35 },
        { time: "2024-09-24", dataset: 98 },
        { time: "2024-09-25", dataset: 84 },
        { time: "2024-09-26", dataset: 9 },
        { time: "2024-09-27", dataset: 1 },
        { time: "2024-09-28", dataset: 60 },
        { time: "2024-09-29", dataset: 35 },
        { time: "2024-09-30", dataset: 98 },
        { time: "2024-10-01", dataset: 84 },
        { time: "2024-10-02", dataset: 9 },
        { time: "2024-10-03", dataset: 1 },
        { time: "2024-10-04", dataset: 60 },
        { time: "2024-10-05", dataset: 35 },
        { time: "2024-10-06", dataset: 98 },
        { time: "2024-10-07", dataset: 84 },
        { time: "2024-10-08", dataset: 9 },
        { time: "2024-10-09", dataset: 1 },
        { time: "2024-10-10", dataset: 60 },
    ];

    const dataRevenua = [
        { name: "Month 1", dataset: 560 },
        { name: "Month 2", dataset: 680 },
        { name: "Month 3", dataset: 310 },
        { name: "Month 4", dataset: 390 },
        { name: "Month 5", dataset: 520 },
        { name: "Month 6", dataset: 590 },
        { name: "Month 7", dataset: 420 },
        { name: "Month 8", dataset: 650 },
        { name: "Month 9", dataset: 110 },
        { name: "Month 10", dataset: 290 },
        { name: "Month 11", dataset: 620 },
        { name: "Month 12", dataset: 590 },
    ];

    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return data;

        const startDateObj = startDate.toDate();
        const endDateObj = endDate.toDate();

        return data.filter((entry) => {
            const entryDate = new Date(entry.time);
            return entryDate >= startDateObj && entryDate <= endDateObj;
        });
    }, [startDate, endDate, data]);

    const handleDateChange = (start: Dayjs | null, end: Dayjs | null) => {
        setStartDate(start);
        setEndDate(end);
    };

    const sumSub = useMemo(() => {
        return filteredData.reduce((total, entry) => total + entry.dataset, 0);
    }, [data]);
    const sumRevenua = useMemo(() => {
        return dataRevenua.reduce((total, entry) => total + entry.dataset, 0);
    }, [data]);

    return (
        <div>
            <Text variant="heading3xl" as="h2">
                Dashboard
            </Text>

            <div>
                <div style={{ marginTop: "50px", marginBottom: "20px" }}>
                    <DateRange
                        startDate={startDate}
                        endDate={endDate}
                        onDateChange={handleDateChange}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: "50px",
                    }}
                >
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            flex: 1,
                            marginRight: "10px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Text variant="heading3xl" as="h2">
                            Subcription
                        </Text>
                        <Text variant="heading3xl" as="h2">
                            {sumSub}
                        </Text>
                        <LineChart width={600} height={300} data={filteredData}>
                            <Line
                                type="monotone"
                                dataKey="dataset"
                                stroke="#FF69B4"
                                activeDot={{ r: 8 }}
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                        </LineChart>
                    </div>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "16px",
                            flex: 1,
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Text variant="heading3xl" as="h2">
                            Revenua
                        </Text>
                        <Text variant="heading3xl" as="h2">
                            ${sumRevenua}
                        </Text>
                        <BarChart width={600} height={300} data={dataRevenua}>
                            <Bar dataKey="dataset" fill="#FF69B4" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                        </BarChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
