import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams }: Props) {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  // return <LatestIssues />;

  const issueProps = {
    closed: closedIssues,
    inProgress: inProgressIssues,
    open: openIssues,
  };
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction="column" gap={"5"}>
        <IssueSummary {...issueProps} />
        <IssueChart {...issueProps} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
