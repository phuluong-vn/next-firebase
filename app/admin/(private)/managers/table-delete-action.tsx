"use client";

import React, { useTransition } from 'react'
import { ConfirmDialog } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { deleteCategoryAction } from './action';

interface IProps {
    id: string;
}
const TableDeleteAction = ({ id }: IProps) => {
    const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
        try {
            await deleteCategoryAction(id);
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

export default TableDeleteAction
