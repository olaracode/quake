import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import QuakeComments from "./QuakeComments";

import { SeismicItem } from "../../core/types";
const QuakeDetails = ({
  item,
  isOpen,
  onClose,
}: {
  item: SeismicItem;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const date = new Date(item.attributes.time).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.attributes.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow={"auto"}>
          <Stack divider={<StackDivider borderColor="gray.200" />} spacing={3}>
            <Stack gap="2">
              <strong>Magnitud:</strong>
              <Text casing="capitalize">{item.attributes.magnitude}</Text>
            </Stack>
            <Stack gap="2">
              <strong>Fecha:</strong>
              <Text casing="capitalize">{date}</Text>
            </Stack>
            <Stack gap="2">
              <strong>Tsunami:</strong>
              <Text casing="capitalize">
                {item.attributes.tsunami ? <FaCheck /> : <ImCross />}
              </Text>
            </Stack>
            <Stack gap="2">
              <strong>Latitud:</strong>
              <Text casing="capitalize">
                {item.attributes.coordinates.latitude}
              </Text>
            </Stack>
            <Stack gap="2">
              <strong>Longitud:</strong>
              <Text casing="capitalize">
                {item.attributes.coordinates.longitude}
              </Text>
            </Stack>
          </Stack>
          <QuakeComments id={item.id} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuakeDetails;
