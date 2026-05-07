"use client";

import React, { useTransition } from 'react'
import { ConfirmDialog } from '@/components/ui/alert-dialog';
import { deleteProductAction } from './action';
import { toast } from 'sonner';

interface IProps {
    id: string;
}
const TableDeleteAction = ({ id }: IProps) => {
    const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
        try {
            await deleteProductAction(id);
            toast.success("Product deleted successfully!");
        } catch (e) {
            toast.error("Failed to delete product! Please try again.");
        }
    });
  };
  return (
     <ConfirmDialog
      title="Delete Product"
      description="Are you sure you want to delete this product?"
      actionTitle={pending ? "Deleting..." : "Delete"}
      onConfirm={handleDelete} />
  )
}

export default TableDeleteAction
