"use client";
import { Card, CardBody, CardHeader, HStack, Text } from "@chakra-ui/react";
import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MdBloodtype } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa6";
import { GiLifeBar } from "react-icons/gi";
import { COLORS } from "@/app/colors";

const Charts = ({ chartData, chartType, latestVital }: any) => {
  return (
    <Card p={0}>
      <CardHeader pb={0}>
        <HStack>
          <MdBloodtype size={"24px"} />
          <Text fontSize={"large"} fontWeight={"400"}>
            {chartType === "heartRate"
              ? "Heart Rate"
              : chartType === "bodyTemp"
              ? "Body Temprature"
              : chartType === "oxygenLevel"
              ? "Oxygen Level"
              : "Blood Pressure"}
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <HStack>
          <Text fontSize={"2xl"}>{latestVital}</Text>
          <Text fontSize={"small"} color={COLORS.text_gray}>
            mg/dL
          </Text>
        </HStack>
        <AreaChart
          width={200}
          height={150}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="name" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey={chartType === "bp" ? "hBp" : chartType}
            stroke="#8884d8"
            fill="#8884d8"
          />
          {chartType === "bp" && (
            <Area
              type="monotone"
              dataKey={chartType === "bp" ? "lBp" : chartType}
              stroke="#8884d8"
              fill="#8884d8"
            />
          )}
        </AreaChart>
      </CardBody>
    </Card>
  );
};

export default Charts;
