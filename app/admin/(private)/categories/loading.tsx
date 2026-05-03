import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TablePagination from "@/components/commons/table-pagination";
import TableHeader from "./table-header";
import TableLoading from "@/components/commons/table-loading";

const Category = async () => {
  return (
    <div>
      <TableHeader/>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <TableLoading />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> categories
          </div>
          <TablePagination total={10} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Category;