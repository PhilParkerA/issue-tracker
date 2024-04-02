import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";

const LoadingIssueDetailsPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Flex gapX={"3"} my={"2"}>
        <Skeleton width={"5rem"} />
        <Text>
          <Skeleton width={"8rem"} />
        </Text>
      </Flex>
      <Card className={"prose"} mt={"4"}>
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailsPage;
