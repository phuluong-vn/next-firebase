### 1. intalle Markdown All in One
## Features
### Admin panel
    - Managers management (admins)
    - Categories management
    - Products management
    - Users management
    - Order management
    - Coupon management
### Customer
    - Homepage(all products pagination, categories list)
    - Category detail
    - Product detail
    - Cart
    - Payment
    - Order Status
  
## DB Dessign
### Admins management
    ```
    email: string
    password: string
    isActive: boolean
    deleted_at: string
    created_at: string
    updated_at: string
    
    ```
### Categories 
```
    - name: string
    - slug: string
    - description: string
    - images: string[] url to storage 
    - deleted_at: string
    - created_at: string
    - updated_at: string
```
### Products
```
    - name: string
    - slug: string
    - description: string
    - images: string[] url to storage firebase
    - created_by: AdminRef
    - categories: Array<CategoriesRef>
        |### Categories
        - id: string
        - name: string
        - slug: string
        - description: string
    - properties:
        |### Properties
        - name: string
        - color: string
        - size: string
        - price: number
```
### Coupons
```
    - name: string
    - code: string
    - expired_at: string
    - percent: number(%)
    - stripe_id: string 
```

### Users
```
    - email: string
    - google_id: string
    - facebook_id: string
    - firstName: string
    - lastName: string
    - avt: string
```
### Cart
```
    - user : UserRef
    - products: Array<ProductRef>
```

### Orders
```
    - user : UserRef
    - products: Array<ProductRef>
    - coupon: CouponRef
    - total: number
    - stripe_invoice_id: string
    - status: string
```

## Package installe:
    - firebase: pnpm install firebase //connect with firebase
    - shacn-ui: pnpm dlx shadcn@latest init
    - clsx: pnpm install --save clsx
    - react-hook-form: pnpm install react-hook-form
    - bcrypt: pnpm i bcrypt //hash password
    - @types/bcrypt: pnpm i -D @types/bcrypt