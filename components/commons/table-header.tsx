'use client';

import OrderData, { IOrderProps } from "@/components/commons/order-data";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface IProps extends IOrderProps  {
  url: string;
}
const TableHeader = ({ url, options }: IProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
         <OrderData options={options}/>
        <div className="ml-auto flex items-center gap-2">
           <Link
              href={url}
              className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;