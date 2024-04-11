import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  SimpleGrid,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import usePagination from "../../core/hooks/usePagination";
import { useNavigate } from "react-router-dom";
const queryOptions = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];
const Query = () => {
  const navigate = useNavigate();
  const { query } = usePagination();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const checkboxes = form.elements;
    const checkedOptions = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedOptions.push(checkboxes[i].name);
      }
    }
    const newUrl = new URL(window.location.href);
    const magTypeParams = checkedOptions
      .map((option) => `mag_type[]=${option}`)
      .join("&");
    newUrl.searchParams.set("query", magTypeParams);
    navigate(newUrl.search);
    onClose();
  };

  const clearFilters = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("query");
    navigate(newUrl.search);
    onClose();
  };

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Filtros
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtrar por magnitud</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody display="flex" flexDir="column">
              {queryOptions.map((option) => (
                <Checkbox
                  key={option}
                  name={option}
                  defaultChecked={query.includes(option)}
                >
                  Magnitud {option.toUpperCase()}
                </Checkbox>
              ))}
              <SimpleGrid columns={{ sm: 1, md: 2 }} gap="2">
                <Button colorScheme="blue" mt={3} type="submit">
                  Filter
                </Button>
                <Button
                  onClick={clearFilters}
                  variant={"ghost"}
                  colorScheme="red"
                  mt={3}
                >
                  Clear filters
                </Button>
              </SimpleGrid>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Query;
