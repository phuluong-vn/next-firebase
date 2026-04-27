import React, { Suspense } from 'react'
import CategoryTable from './table'
import TableHeader from './table-header'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TablePagination from '@/components/commons/table-pagination'

const Category = () => {
  return (
    <div className="p-5">
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage your Categories .</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense >
            <CategoryTable />
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
