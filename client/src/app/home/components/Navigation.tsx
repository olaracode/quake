import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@chakra-ui/react";
const Navigation = ({
  page,
  total,
  limit,
}: {
  page: string;
  total: number;
  limit: string;
}) => {
  const navigate = useNavigate();
  return (
    <ButtonGroup isAttached size="xs">
      <Button
        onClick={() => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("page", (parseInt(page) - 1).toString());
          navigate(newUrl.search);
        }}
        isDisabled={parseInt(page) === 1}
      >
        Anterior
      </Button>
      <Button disabled cursor="default">
        {page} de {Math.ceil(total / parseInt(limit))}
      </Button>
      <Button
        onClick={() => {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set("page", (parseInt(page) + 1).toString());
          navigate(newUrl.search);
        }}
        isDisabled={parseInt(page) * parseInt(limit) >= total}
      >
        Siguiente
      </Button>
    </ButtonGroup>
  );
};

export default Navigation;
