"use client";

import React, { useTransition } from 'react'
import { ConfirmDialog } from '@/components/ui/alert-dialog';
import { deleteCategoryAction } from './action';
import { toast } from 'sonner';

interface IProps {
    id: string;
}
const TableDeleteAction = ({ id }: IProps) => {
    const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
        try {
            await deleteCategoryAction(id);
            toast.success("Category deleted successfully!");
        } catch (e) {
            toast.error("Failed to delete category! Please try again.");
        }
    });
  };
  return (
     <ConfirmDialog
      title="Delete Category"
      description="Are you sure you want to delete this category?"
      actionTitle={pending ? "Deleting..." : "Delete"}
      onConfirm={handleDelete} />
  )
}

export default TableDeleteAction
