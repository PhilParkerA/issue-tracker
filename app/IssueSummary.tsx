import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface SummaryStatus {
  label: string;
  value: number;
  status: Status;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: SummaryStatus[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.status}>
          <Flex direction={"column"} gap={"1"}>
            <Link href={"/issues/list?status=" + container.status}>
              {container.label}
            </Link>
            <Heading>{container.value}</Heading>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
