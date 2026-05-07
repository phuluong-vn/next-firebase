import React, { Suspense } from 'react'
import ProductTable from './table'
import TableHeader from '../../../../components/commons/table-header'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TablePagination from '@/components/commons/table-pagination'
import { getProducts } from '@/features/products/model'
import { IGetDataInput } from '@/features/type'
import SearchBar from '@/components/commons/search'

interface IProps {
  searchParams: IGetDataInput;
}

const Product = async ({searchParams}:IProps) => {
  
  const params = await searchParams;
  const res = await getProducts({
    keyword: params.keyword || "",
    page: params.page,
    orderField: params.orderField || "created_at",
    orderType: params.orderType || "desc",
  });


  return (
    <div>
      <TableHeader url="/admin/products/new" />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className = "flex items-center justify-between w-full">
          <div>
            <CardTitle className='text-3xl font-bold'>Products</CardTitle>
          </div>
          <SearchBar/>
        </CardHeader>
        <CardContent>
          <Suspense >
            <ProductTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
             <strong>{res.meta.total}</strong> products
          </div>
          <TablePagination total={res.meta.total}/>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Product
