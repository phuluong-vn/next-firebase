"use client";
import React, { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export interface IOrderProps {
  options?: string[];
}
const OrderData = ({ options }: IOrderProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const orderField = useMemo(
    () => searchParams.get("orderField") || "name",
    [searchParams]
  );

  const orderType = useMemo(
    () => searchParams.get("orderType") || "desc",
    [searchParams]
  );

  const onChangeOrderField = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("orderField", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const onChangeOrderType = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("orderType", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const orderOptions = options || ["name", "created_at", "updated_at"];
  return (
    <div className="flex gap-1">
      <Select value={orderField} onValueChange={onChangeOrderField}>
        <SelectTrigger className="w-[140px] py-1">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {orderOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option.toUpperCase().split("_").join(" ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Tabs value={orderType} onValueChange={onChangeOrderType}>
        <TabsList>
          <TabsTrigger value="asc">
            <ArrowUp className="h-3.5 w-3.5" />
          </TabsTrigger>
          <TabsTrigger value="desc">
            <ArrowDown className="h-3.5 w-3.5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrderData;