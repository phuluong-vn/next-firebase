"use client";
import React from 'react'
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdOutlineModeEdit  } from "react-icons/md";
import Link from 'next/link';
import { IAdminDB } from '@/features/managers/type';
import TableDeleteAction from './table-delete-action';

interface IProps {
  data: IAdminDB[];
}

const ManagerTable = ({data}:IProps) => {

  return (
    <Table >
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Created at</TableHead>
      <TableHead>Edited at</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className='w-100px'>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
       {data.map((manager) => (
        <TableRow key={manager.id}>
            <TableCell>{manager.email}</TableCell>
            <TableCell>{moment(manager.created_at).calendar()}</TableCell>
            <TableCell>{moment(manager.updated_at).calendar()}</TableCell>
             <TableCell>{manager.isActive ? "Active" : "Inactive"}</TableCell>
            <TableCell>
                <div className='flex justify-center gap-1'>
                    <Link href={`/admin/managers/edit/${manager.id}`}>
                        <MdOutlineModeEdit />
                    </Link>
                    <TableDeleteAction id={manager.id} />
                </div>
            </TableCell>
        </TableRow>
       ))}
  </TableBody>
</Table>
  )
}

export default ManagerTable
