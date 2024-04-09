"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios
      .delete("/api/issues/" + issueId)
      .then(() => {
        router.push("/issues");
        router.refresh();
      })
      .catch((err) => alert("Failed to delete issue"));
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth={"450px"}>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? THIS ACTION CANNOT BE
          UNDONE.
        </AlertDialog.Description>
        <Flex mt={"4"} gap={"2"} justify={"end"}>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              No
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={handleDelete}>
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
