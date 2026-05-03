    "use client"
    
    import * as React from "react"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { Controller, SubmitHandler, useForm } from "react-hook-form"
    
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
    import { CategoryFormValues, CategorySchema } from "@/features/categories/rule"
import { ICategoryInput } from "@/features/categories/type"
   
    interface  IProps{
        nameFormAction:string;
        data?: ICategoryInput;
        onSubmit: (data: CategoryFormValues) => void;
    }
    
    export default function FormCategory ({nameFormAction, data, onSubmit}:IProps) {
    
      const {
        control,
        handleSubmit,
          reset,
        formState: { isValid }} = useForm<CategoryFormValues>({
          resolver: zodResolver(CategorySchema),
          mode:"onChange",
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
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <Field orientation="horizontal">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit" form="form-rhf-demo" disabled={!isValid}>
                Submit
              </Button>
            </Field>
          </CardFooter>
        </Card>
      )
    }
    