import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackItem,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import { SeismicItem } from "../../core/types";
import QuakeItem from "./QuakeItem";
const QuakeCard = ({ item }: { item: SeismicItem }) => {
  const date = new Date(item.time).toLocaleString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const magnitude = `${item.mag.toFixed(2)} ${item.magType}`;
  return (
    <Card bg="brand.card" color="text-white">
      <CardHeader display="flex" justifyContent={"space-between"}>
        <Heading as="h3" fontSize="md">
          {item.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />}>
          <QuakeItem name="Magnitud" value={magnitude} />
          <QuakeItem name="Fecha" value={date} />
          <StackItem>
            <Button size="xs">Detalles</Button>
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuakeCard;
