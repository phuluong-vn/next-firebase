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
import { IProductDb } from '@/features/products/type';
import TableDeleteAction from './table-delete-action';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface IProps {
  data: IProductDb[];
}

const ProductTable = ({data}:IProps) => {

  return (
    <Table >
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Slug</TableHead>
       <TableHead>Categories</TableHead>
        <TableHead>Price</TableHead>
      <TableHead>Create by</TableHead>
      <TableHead>Created at</TableHead>
      <TableHead>Edited at</TableHead>
      <TableHead className='w-100px'>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
       { data.map((product) => (
        <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.slug}</TableCell>
            <TableCell>
                {product.categories.map((c) => (
                  <Badge key={c.id}>{c.name}</Badge>
                ))}
            </TableCell>
              <TableCell>{product.defaultPrice}</TableCell>
            <TableCell>{product.created_by.email || "N/A"}</TableCell>
            <TableCell>{moment(product.created_at).calendar()}</TableCell>
            <TableCell>{moment(product.updated_at).calendar()}</TableCell>
            <TableCell>
                <div className='flex justify-center gap-1'>
                    <Link href={`/admin/products/edit/${product.id}`}>
                        <MdOutlineModeEdit />
                    </Link>
                    <TableDeleteAction id={product.id} />
                </div>
            </TableCell>
        </TableRow>
       ))}
  </TableBody>
</Table>
  )
}

export default ProductTable
