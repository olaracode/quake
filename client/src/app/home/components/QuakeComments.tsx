import { Box, Input, Button, Text, SimpleGrid } from "@chakra-ui/react";
import { getSeismicComments, postSeismicData } from "../../core/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
const QuakeComments = ({ id }: { id: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { isError, data, isLoading } = useQuery(`quake:${id}:comments`, () =>
    getSeismicComments(id)
  );

  const mutation = useMutation(
    (content: string) => postSeismicData(id, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`quake:${id}:comments`);
      },
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    mutation.mutate(inputRef.current?.value);
    inputRef.current.value = "";
  };

  if (isError) return <div>Error: Ha ocurrido un error</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box mt="2">
      <SimpleGrid gap="2">
        {data && data.length > 0 ? (
          data?.map((comment) => (
            <Box
              key={comment.id}
              p="2"
              border="1px solid"
              borderColor="gray.300"
              rounded="lg"
              bg="gray.50"
            >
              <Text ml="auto" fontSize="sm" color="gray.500">
                {new Date(comment.created_at).toLocaleString("es-ES")}
              </Text>
              <Text fontWeight={"bold"}>{comment.content}</Text>
            </Box>
          ))
        ) : (
          <Box p="2" borderWidth="1px">
            No hay comentarios
          </Box>
        )}
      </SimpleGrid>

      <Box mt="5">
        <form onSubmit={onSubmit}>
          <Input ref={inputRef} placeholder="Escribe un comentario" />
          <Button mt="2" type="submit">
            enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default QuakeComments;
