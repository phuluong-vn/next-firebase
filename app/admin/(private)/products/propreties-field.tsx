"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IProperties } from "@/features/products/type";
import { Plus, Trash } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";

const defaultProperties: IProperties = {
  name: "",
  color: "",
  size: "",
  price: 0,
  //stripeId: "",
};

interface IProps {
  value: IProperties[] | undefined;
  onChange: (value: IProperties[]) => void;
}
const PropertiesField = ({ value = [], onChange }: IProps) => {

  const onAddProperty = () => {
    onChange([...value, { ...defaultProperties }]);
  };

  const onRemoveProperty = (index: number) => {
    onChange(value.filter((_, idx) => idx !== index));
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newProperties = value.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [e.target.name]:
            e.target.name === "price"
              ? Number(e.target.value || 0)
              : e.target.value,
        };
      }
      return item;
    });

    onChange(newProperties);
  };
  return (
    <div className="flex gap-3 flex-col">
      {value.map(({ name, color, size, price }, index) => (
        <div className="flex gap-3" key={index}>
          <Input
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChangeValue(e, index)}
          />
          <Input
            placeholder="color"
            name="color"
            value={color}
            onChange={(e) => onChangeValue(e, index)}
          />
          <Input
            placeholder="size"
            name="size"
            value={size}
            onChange={(e) => onChangeValue(e, index)}
          />
          <Input
            name="price"
            placeholder="price, ex: 10.000 vnd"
            type="number"
            value={price}
            onChange={(e) => onChangeValue(e, index)}
          />
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={() => onRemoveProperty(index)}
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={onAddProperty}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default PropertiesField;