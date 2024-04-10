import React from "react";
import { StackItem, Heading, Text } from "@chakra-ui/react";
const QuakeItem = ({
  name = "key",
  value = "value",
}: {
  name: string;
  value: number | string;
}) => {
  return (
    <StackItem>
      <Heading as="h4" fontSize="sm">
        {name}
      </Heading>
      <Text fontSize="sm" fontWeight={"light"}>
        {value}
      </Text>
    </StackItem>
  );
};

export default QuakeItem;
