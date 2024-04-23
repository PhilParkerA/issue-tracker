import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "../../components";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    orderDirection: "asc" | "desc";
    page: string;
  };
}

interface Columns {
  label: string;
  value: keyof Issue;
  className?: string;
}

const columns: Columns[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDirection }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface" mb={"3"}>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                      orderDirection:
                        searchParams.orderDirection === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy &&
                  (searchParams.orderDirection === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        currentPage={page}
        itemsCount={issueCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
