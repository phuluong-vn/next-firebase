import React, { Suspense } from 'react'
import CategoryTable from './table'
import TableHeader from './table-header'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TablePagination from '@/components/commons/table-pagination'
import { getCategories } from '@/features/categories/model'
import { IGetDataInput } from '@/features/type'
import SearchBar from '@/components/commons/search'
import RefreshOnMount from '@/app/refresh-page'

interface IProps {
  searchParams: IGetDataInput;
}

const Category = async ({searchParams}:IProps) => {
  
  const params = await searchParams;
  const res = await getCategories({
    keyword: params.keyword || "",
    page: params.page,
    orderField: params.orderField || "created_at",
    orderType: params.orderType || "desc",
  });
  return (
    <div>
      <TableHeader />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className = "flex items-center justify-between w-full">
          <div>
            <CardTitle className='text-3xl font-bold'>Categories</CardTitle>
          </div>
          <SearchBar/>
        </CardHeader>
        <CardContent>
          <Suspense >
            <RefreshOnMount />
            <CategoryTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
             <strong>{res.meta.total}</strong> categories
          </div>
          <TablePagination total={res.meta.total}/>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Category
