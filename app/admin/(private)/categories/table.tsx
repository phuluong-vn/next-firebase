import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdOutlineModeEdit,MdOutlineDeleteForever  } from "react-icons/md";

const CategoryTable = () => {
  return (
    <Table>
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
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>12/09/2024</TableCell>
      <TableCell>12/09/2024</TableCell>
       <TableCell>
        <div className='flex justify-center gap-1'>
            <MdOutlineModeEdit />
            <MdOutlineDeleteForever />
        </div>
       </TableCell>
    </TableRow>
  </TableBody>
</Table>
  )
}

export default CategoryTable
