import { Heading, Container, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

import usePagination from "../core/hooks/usePagination";
import { getSeismicData } from "../core/api";

import Map from "../core/components/Map";
import { Query, Limit, Navigation, QuakeCard } from "./components";

const Home = () => {
  const { page, limit, query } = usePagination();
  const { isError, data, isLoading } = useQuery(
    `quake:${page}:${limit}:${query}`, // We use the query key to cache the data, so we can reuse it
    () => getSeismicData(page, limit, query)
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
          {parseInt(page) * parseInt(limit)} / {data?.pagination.total || 1}
        </Text>
        <Flex gap="2" align="center">
          <Query />
          <Limit />
        </Flex>
      </Flex>
      {isLoading ? (
        <SimpleGrid columns={{ sm: 1, md: 2 }} gap={3} pb="5">
          {
            // Skeletons are used to show a loading state while the data is being fetched
            // We use the limit to show the same amount of skeletons as the limit to prevent
            // layout shifting
          }
          {[...Array(parseInt(limit))].map((_, index) => (
            <QuakeCard.Skeleton key={`quake-skeleton-${index}-${_}`} />
          ))}
          <Navigation.Skeleton />
        </SimpleGrid>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};

export default Home;
