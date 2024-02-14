import { Button } from "@chakra-ui/react";
import React from "react";

const DoctorTimeSlots = ({ selectedDate, doctorsAvailability }: any) => {
  return (
    <div>
      {doctorsAvailability?.length > 0 &&
        doctorsAvailability
          .filter((date: any) => date.date === selectedDate)
          .map((date: any) => {
            const unavailableTimeSlots = date?.generatedUnavailableTimeSlots;
            const generatedSlots =
              date?.generatedAvailableTimeSlots.filter(
                (time: any) => !unavailableTimeSlots.includes(time)
              ) || [];
            return (
              generatedSlots.length > 0 && (
                <React.Fragment key={date.date}>
                  {generatedSlots.map((slot: any, index: any) => (
                    <Button
                      key={index}
                      variant={"outline"}
                      onClick={() => {}}
                      // color={
                      //   selectedTimeSlot === slot ? "white" : COLORS.secondary
                      // }
                      m={2}
                    >
                      {slot}
                    </Button>
                  ))}
                </React.Fragment>
              )
            );
          })}
    </div>
  );
};

export default DoctorTimeSlots;
