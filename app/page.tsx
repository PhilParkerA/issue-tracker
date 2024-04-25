import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: "OPEN" } });
  const closedIssues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const inProgressIssues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

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

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
