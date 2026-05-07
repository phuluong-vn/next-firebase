    "use client"
    
    import * as React from "react"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { Controller, useForm } from "react-hook-form"
    
    import { Button } from "@/components/ui/button"
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card"
    import {
      Field,
      FieldError,
      FieldGroup,
      FieldLabel,
    } from "@/components/ui/field"
    import { Input } from "@/components/ui/input"
    import {
      InputGroup,
      InputGroupAddon,
      InputGroupText,
      InputGroupTextarea,
    } from "@/components/ui/input-group"
import {  useEffect, useMemo, useState } from "react"
import { ProductFormValues, ProductSchema } from "@/features/products/rule"
import { IProductInput } from "@/features/products/type"
import PropertiesField from "./propreties-field"
import MultiSelectFormField from "@/components/ui/multi-select"
import { ICategoryDb } from "@/features/categories/type"
import { IPaginationRes } from "@/features/type"
import {debounce,unionBy} from "lodash";
import { BASE_URL } from "@/constants/commons"
import { useRouter } from "next/navigation"
   
    interface  IProps{
        nameFormAction:string;
        data?: IProductInput;
        onSubmit: (data: ProductFormValues) => void;
    }

    
    
    export default function FormProduct ({nameFormAction, data, onSubmit}:IProps) {
    console.log(data)
      const router = useRouter();
    const [categories, setCategories] = useState<ICategoryDb[]>([]);
    const fetchCategories = useMemo(() => {
      return debounce((keyword: string) => {
        fetch(`${BASE_URL}/api/admin/categories?keyword=${keyword}`)
          .then((res) => res.json())
          .then((data: IPaginationRes<ICategoryDb>) =>
            setCategories((pre) =>
              unionBy(pre.concat(data.data), "id")
            )
          );
      }, 1000);
    }, []);
 
    useEffect(() => {
      fetchCategories("");
    }, []);
      const {
        control,
        handleSubmit,
        formState: { isValid }} = useForm<ProductFormValues>({
          resolver: zodResolver(ProductSchema),
          mode:"onBlur",
          defaultValues: data,
        });
       
      return (
        <Card className="w-full sm:max-w-md ">
          <CardHeader>
            <CardTitle>{nameFormAction}</CardTitle>
            <CardDescription>
              Please fill in all the information below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Name
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter title of category"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="slug"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Slug
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="enter slug for category"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                name="images"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="images">Images</FieldLabel>
    
                    <Input
                        id="images"
                        type="file"
                        multiple
                        aria-invalid={fieldState.invalid}
                        onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        field.onChange(files);
                        }}
                    />
    
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                    </Field>
                )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Description
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="form-rhf-demo-description"
                          placeholder="I'm having an issue with the login button on mobile."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {(field.value?.length || 0)}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="defaultPrice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Default Price
                      </FieldLabel>
                      <Input
                    type="number"
                    placeholder="10.000 vnd"
                    {...field}
                    onChange={(v) => field.onChange(Number(v.target.value))}
                  />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Product Categories
                      </FieldLabel>
                      <MultiSelectFormField
                    placeholder="Categories"
                    defaultValue={field.value}
                    onValueChange={(ids) => field.onChange(ids)}
                    onSearch={(search) => {
                      if (search) {
                        fetchCategories(search);
                      }
                    }}
                    options={categories.map((c) => ({
                      label: c.name??"",
                      value: c.id,
                    }))}
                  />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                 <Controller
                  name="properties"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Product Properties
                      </FieldLabel>
                      <PropertiesField
                    value={field.value}
                    onChange={field.onChange}
                  />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button type="submit" form="form-rhf-demo" disabled={!isValid}>
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      )
    }
    