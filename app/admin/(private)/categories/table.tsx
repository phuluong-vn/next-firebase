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
import { ICategoryDb } from '@/features/categories/type';
import TableDeleteAction from './table-delete-action';
import Link from 'next/link';

interface IProps {
  data: ICategoryDb[];
}

const CategoryTable = ({data}:IProps) => {

  return (
    <Table >
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Slug</TableHead>
      <TableHead>Created at</TableHead>
      <TableHead>Edited at</TableHead>
      <TableHead className='w-100px'></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
       {data.map((category) => (
        <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.slug}</TableCell>
            <TableCell>{moment(category.created_at).calendar()}</TableCell>
            <TableCell>{moment(category.updated_at).calendar()}</TableCell>
            <TableCell>
                <div className='flex justify-center gap-1'>
                    <Link href={`/admin/categories/edit/${category.id}`}>
                        <MdOutlineModeEdit />
                    </Link>
                    <TableDeleteAction id={category.id} />
                </div>
            </TableCell>
        </TableRow>
       ))}
  </TableBody>
</Table>
  )
}

export default CategoryTable
