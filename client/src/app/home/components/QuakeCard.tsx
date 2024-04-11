import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackItem,
  StackDivider,
  Button,
  useDisclosure,
  SkeletonText,
} from "@chakra-ui/react";
import { SeismicItem } from "../../core/types";
import QuakeItem from "./QuakeItem";
import QuakeDetails from "./QuakeDetails";

const QuakeCard = ({ item }: { item: SeismicItem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const date = new Date(item.attributes.time).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const magnitude = `${item.attributes.magnitude.toFixed(2)} ${
    item.attributes.mag_type
  }`;
  return (
    <Card bg="brand.card" color="text-white">
      <CardHeader display="flex" justifyContent={"space-between"}>
        <Heading as="h3" fontSize="md">
          {item.attributes.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <QuakeItem name="Magnitud" value={magnitude} />
          <QuakeItem name="Fecha" value={date} />
          <StackItem>
            <Button size="xs" onClick={onOpen}>
              Detalles
            </Button>
            <QuakeDetails item={item} isOpen={isOpen} onClose={onClose} />
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

const Skeleton = () => {
  return (
    <Card bg="brand.card" color="text-white">
      <CardHeader display="flex" justifyContent={"space-between"}>
        <Heading as="h3" fontSize="md">
          <SkeletonText />
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <SkeletonText />
          <SkeletonText />
        </Stack>
      </CardBody>
    </Card>
  );
};

QuakeCard.Skeleton = Skeleton;
export default QuakeCard;
