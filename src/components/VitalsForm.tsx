import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const VitalsForm = ({
  isOpen,
  onClose,
  handleUpdateVitals,
  handleJoinConsultaion,
  fromDashboard,
}: any) => {
  const [vitals, SetVitalsForm] = useState({
    height: 0,
    weight: 0,
    hBp: 0,
    lBp: 0,
    heartRate: 0,
    bodyTemp: 0,
    bloodSugar: 0,
    oxygenLevel: 0,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text>Add / Update your vitals</Text>
        </ModalHeader>
        <ModalBody>
          <HStack>
            <FormControl>
              <FormLabel>Height</FormLabel>
              <Input
                placeholder="inch"
                type="number"
                value={vitals.height}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    height: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                type="number"
                placeholder="kg"
                value={vitals.weight}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    weight: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>High BP</FormLabel>
              <Input
                type="number"
                placeholder="bpm"
                value={vitals.hBp}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    hBp: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Low BP</FormLabel>
              <Input
                type="number"
                placeholder="bpm"
                value={vitals.lBp}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    lBp: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>Heart rate</FormLabel>
              <Input
                type="number"
                placeholder="hrm"
                value={vitals.heartRate}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    heartRate: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Body temprature</FormLabel>
              <Input
                type="number"
                placeholder="f"
                value={vitals.bodyTemp}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    bodyTemp: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>Blood Sugar</FormLabel>
              <Input
                type="number"
                placeholder="mg/dL"
                value={vitals.bloodSugar}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    bloodSugar: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Oxygen level</FormLabel>
              <Input
                type="number"
                placeholder="%"
                value={vitals.oxygenLevel}
                onChange={(e) =>
                  SetVitalsForm((prevState: any) => ({
                    ...prevState,
                    oxygenLevel: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </HStack>
        </ModalBody>
        <ModalFooter>
          {fromDashboard ? (
            <Button onClick={() => handleUpdateVitals(vitals)}>
              Update Vitals
            </Button>
          ) : (
            <HStack>
              <Button onClick={() => handleUpdateVitals(vitals)}>
                Update & Join
              </Button>
              <Button
                variant={"outline"}
                onClick={() => handleJoinConsultaion()}
              >
                Skip & Join
              </Button>
            </HStack>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VitalsForm;
