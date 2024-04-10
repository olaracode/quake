import { useEffect, useState } from "react";
import { Heading, Container, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import Map from "../core/components/Map";
import QuakeCard from "./components/QuakeCard";
import { SeismicApiResponse } from "../core/types";
import Navigation from "./components/Navigation";
import Limit from "./components/Limit";
import Query from "./components/Query";
import usePagination from "../core/hooks/usePagination";
const ENDPOINT = "http://localhost:3000/api/v1/sismos";
const Home = () => {
  const { page, limit, query } = usePagination();
  const [total, setTotal] = useState(0);
  const [seismicData, setSeismicData] = useState<SeismicApiResponse>();
  function getSeismicData() {
    fetch(`${ENDPOINT}?page=${page}&limit=${limit}&query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(query);
        setTotal(data.pagination.total);
        setSeismicData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getSeismicData();
  }, [limit, page, query]);
  return (
    <Container maxW="container.lg">
      <Map items={seismicData ? seismicData.data : []} />
      <Heading as="h2" textAlign="center">
        Informacion sismica de los ultimos 30 dias
      </Heading>
      <Flex justify={"space-between"} align="end" my="3">
        <Text>
          {parseInt(page) * parseInt(limit)} / {total}
        </Text>
        {/* Horrible naming convention? */}
        <Flex gap="2" align="center">
          <Query />
          <Limit limit={limit} />
        </Flex>
      </Flex>
      <SimpleGrid columns={{ sm: 1, md: 2 }} gap={3}>
        {seismicData &&
          seismicData.data.length > 0 &&
          seismicData.data.map((item) => {
            return <QuakeCard key={item.id} item={item} />;
          })}
      </SimpleGrid>
      <Flex justify="center" py="5">
        <Navigation limit={limit} page={page} total={total} />
      </Flex>
    </Container>
  );
};

export default Home;
