import React, { Suspense } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import TablePagination from '@/components/commons/table-pagination'
import { IGetDataInput } from '@/features/type'
import SearchBar from '@/components/commons/search'
import TableHeader from '@/components/commons/table-header'
import ManagerTable from './table'
import { getManagers } from '@/features/managers/model'

interface IProps {
  searchParams: IGetDataInput;
}

const Manager = async ({searchParams}:IProps) => {
  
  const params = await searchParams;
  const res = await getManagers({
    keyword: params.keyword || "",
    page: params.page,
    orderField: params.orderField || "created_at",
    orderType: params.orderType || "desc",
  });

  return (
    <div>
      <TableHeader url="/admin/managers/new" options={['email','created_at', 'updated_at']} />
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className = "flex items-center justify-between w-full">
          <div>
            <CardTitle className='text-3xl font-bold'>Managers</CardTitle>
          </div>
          <SearchBar/>
        </CardHeader>
        <CardContent>
          <Suspense >
            <ManagerTable data={res.data} />
          </Suspense>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-xs text-muted-foreground">
             <strong>{res.meta.total}</strong> managers
          </div>
          <TablePagination total={res.meta.total}/>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Manager
