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
  
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IAdminInput } from "@/features/managers/type"
import { LoginFormValues, LoginSchema } from "@/features/managers/rules"
   
    interface  IProps{
        nameFormAction:string;
        data?: IAdminInput;
        onSubmit: (data: LoginFormValues) => void;
    }
    
    export default function FormManager ({nameFormAction, data, onSubmit}:IProps) {
    const router = useRouter();
    useEffect(() => {
    router.refresh();
  }, []);
      const {
        control,
        handleSubmit,
        formState: { isValid }} = useForm<LoginFormValues>({
          resolver: zodResolver(LoginSchema),
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
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter email"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Password
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="*******"
                        autoComplete="off"
                        type="password"
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
    