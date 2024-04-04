import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  await delay(2000);
  if (!issue) notFound();

  return (
    <Grid gap={"5"} columns={{ initial: "1", md: "2" }}>
      <Box>
        <Heading>{issue.title} </Heading>
        <Flex gapX={"3"} my={"2"}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()} </Text>
        </Flex>
        <Card className={"prose"} mt={"4"}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
