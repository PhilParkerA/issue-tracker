import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

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
  return (
    <IssueChart
      closed={closedIssues}
      inProgress={inProgressIssues}
      open={openIssues}
    />
  );
}
