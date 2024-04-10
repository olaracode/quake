import { useEffect, useState } from "react";
import { Heading, Container, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import Map from "../core/components/Map";
import QuakeCard from "./components/QuakeCard";
import { SeismicApiResponse } from "../core/types";
import Navigation from "./components/Navigation";
import Limit from "./components/Limit";
import Query from "./components/Query";
import usePagination from "../core/hooks/usePagination";
import { useQuery } from "react-query";
const ENDPOINT = "http://localhost:3000/api/features";
function getSeismicData(page: string, limit: string, query: string) {
  return fetch(`${ENDPOINT}?page=${page}&limit=${limit}&query=${query}`)
    .then((res) => res.json())
    .then((data: SeismicApiResponse) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
const Home = () => {
  const { page, limit, query } = usePagination();
  const { isError, data } = useQuery(`quake:${page}:${limit}:${query}`, () =>
    getSeismicData(page, limit, query)
  );
  if (isError) return <div>Error: Ha ocurrido un error</div>;
  return (
    <Container maxW="container.lg">
      <Map items={data?.data} />
      <Heading as="h2" textAlign="center">
        Informacion sismica de los ultimos 30 dias
      </Heading>
      <Flex justify={"space-between"} align="end" my="3">
        <Text>
          {parseInt(page) * parseInt(limit)} / {data?.pagination.total}
        </Text>
        {/* Horrible naming convention? */}
        <Flex gap="2" align="center">
          <Query />
          <Limit limit={limit} />
        </Flex>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2 }} gap={3}>
        {data?.data.map((item) => {
          return <QuakeCard key={item.id} item={item} />;
        })}
      </SimpleGrid>
      <Flex justify="center" py="5">
        <Navigation
          limit={limit}
          page={page}
          total={data?.pagination.total || 0}
        />
      </Flex>
    </Container>
  );
};

export default Home;
