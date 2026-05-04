"use client";

import React, { useTransition } from 'react'
import { ConfirmDialog } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { deleteManagerAction } from './action';
import { Switch } from '@/components/ui/switch';

interface IProps {
    id: string;
}
export default function TableDeleteAction  ({ id }: IProps) {
    const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
        try {
            await deleteManagerAction(id);
            toast.success("Manager deleted successfully!");
        } catch (e) {
            toast.error("Failed to delete manager! Please try again.");
        }
    });
  };
  return (
     <ConfirmDialog
      title="Delete Manager"
      description="Are you sure you want to delete this manager?"
      actionTitle={pending ? "Deleting..." : "Delete"}
      onConfirm={handleDelete} />
  )
}


interface IActiveAdminActionProps {
  isActive: boolean;
  id: string;
  updateActiveAdmin: (id: string, isActive: boolean) => Promise<void>;
}
export const ActiveAdminAction = ({
  isActive,
  id,
  updateActiveAdmin,
}: IActiveAdminActionProps) => {
  const onChangeActive = async (check: boolean) => {
    try {
      await updateActiveAdmin(id, check);
      toast.info(
        check
          ? "Active manager successfully !"
          : "Inactive manager successfully !"
      );
    } catch (error) {
      toast.error("Update failed !");
    }
  };

  return <Switch checked={isActive} onCheckedChange={onChangeActive} />;
};

