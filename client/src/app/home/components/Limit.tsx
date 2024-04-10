import { useNavigate } from "react-router-dom";
import { Flex, Text, Select } from "@chakra-ui/react";
import usePagination from "../../core/hooks/usePagination";
const limitOptions = [10, 20, 50, 100, 200, 500, 1000];
const Limit = () => {
  const { limit } = usePagination();
  const navigate = useNavigate();
  return (
    <Flex alignItems={"center"} gap="2">
      <Text>Mostrar</Text>
      <Select
        defaultValue={limit}
        onChange={(e) => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("per_page", e.target.value);
          navigate(newUrl.search);
        }}
      >
        {limitOptions.map((item) => {
          return (
            <option key={`${item}-limit-option`} value={item}>
              {item}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};

export default Limit;
