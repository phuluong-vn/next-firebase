
import OrderData from "@/components/commons/order-data";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";


const TableHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
         <OrderData />
        <div className="ml-auto flex items-center gap-2">
           <Link
              href="/admin/categories/new"
              className="sr-only sm:not-sr-only sm:whitespace-nowrap"
            >
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