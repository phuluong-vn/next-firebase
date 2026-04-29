import React, { Suspense } from 'react'
import CategoryTable from './table'
import TableHeader from './table-header'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TablePagination from '@/components/commons/table-pagination'
import { getCategories } from '@/features/categories/model'
import { IGetDataInput } from '@/features/type'

interface IProps {
  searchParams: IGetDataInput;
}

const Category = async ({searchParams}:IProps) => {
  const res = await getCategories({
    keyword: searchParams.keyword || "",
    page: searchParams.page,
    orderField: searchParams.orderField || "name",
    orderType: searchParams.orderType || "desc",
  });
  return (
    <div>
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense >
            <CategoryTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            <strong></strong> categories
          </div>
          <TablePagination total={50}/>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Category
