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
  function navigateToParam(key: string, value: string) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(key, value);
    navigate(newUrl.search);
  }
  return (
    <ButtonGroup isAttached size="xs">
      <Button
        onClick={() => navigateToParam("page", (parseInt(page) - 1).toString())}
        isDisabled={parseInt(page) === 1}
      >
        Anterior
      </Button>
      <Button disabled cursor="default">
        {page} de {Math.ceil(total / parseInt(limit))}
      </Button>
      <Button
        onClick={() => navigateToParam("page", (parseInt(page) + 1).toString())}
        isDisabled={parseInt(page) * parseInt(limit) >= total}
      >
        Siguiente
      </Button>
    </ButtonGroup>
  );
};

export default Navigation;
