import { addDoc, collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
import { ProductSchema } from "./rule";
import { IProductDb, IProductDoc, IProductInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/commons/queries";
import { normalizeSlug } from "@/utils/commons/slug";
import { serializeDocs, serializeSingleDoc } from "@/lib/serialize";
import { getManagerById } from "../managers/model";
import { getCategoryByIds } from "../categories/model";

const productsRef = collection(db,COLLECTION.PRODUCT);


export const getProductBySlug = async (slug: string) =>{
    const normalizedSlug = normalizeSlug(slug);
     const snapshot = await getDocs(
    query(
      productsRef,
      where("slug", "==", normalizedSlug),
      limit(1)
    )
  );
  if (snapshot.empty) return undefined;

  const doc = snapshot.docs[0];

  return {
    ...(doc.data() as IProductDoc),
    id: doc.id,
  };
}


export const getProductById = async (id: string) =>{
  if (!id) throw new Error("Invalid ID"); 
  const existedProduct  = await getDoc(doc(productsRef, id));
  if (!(existedProduct).exists) return undefined;
  const Product = serializeSingleDoc<IProductDb>(existedProduct);
  return {
    ...Product,
    id: existedProduct.id,
  };
}

export const deleteProductById = async (id: string) =>{
  if (!id) throw new Error("Invalid ID"); 
  return await deleteDoc(doc(productsRef, id));
}

export const addProduct = async(data: IProductInput):Promise<IProductDb> =>{
    const validate = await ProductSchema.safeParse(data);
    if(!validate.success)
    {
        throw Error(validate.error.issues[0].message);
    }
    const slug = normalizeSlug(validate.data.slug);
    const existedProduct = await getProductBySlug(slug);
    if(existedProduct)
    {
        throw Error("Slug have been used!");
    }

    const { createdId, categoryIds, ...restData } = data;
    
    const created_by = await getManagerById(createdId);
    const categories = await getCategoryByIds(categoryIds);
    const newProducRef = await addDoc(productsRef,{
        ...restData,
        created_by: created_by,
        categoryIds: categories.map((c) => c.id),
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
    })

    const newProduct = await getDoc(newProducRef);
    return {...(newProduct.data() as IProductDb), id: newProducRef.id};
}

export const editProduct = async(id: string, data: IProductInput):Promise<IProductDb | undefined> =>{
  const Product = await getProductById(id);
  if(!Product)
  {
    return undefined;
  }  
  const validate = await ProductSchema.safeParse(data);
    if(!validate.success)
    {
        throw Error(validate.error.issues[0].message);
    }
    const slug = normalizeSlug(validate.data.slug);
    const existedProduct = await getProductBySlug(slug);
    if(existedProduct && existedProduct.id !== id)
    {
        throw Error("Slug have been used!");
    }
    try {
        await updateDoc(doc(productsRef, id), {
            ...data,
            updated_at: Timestamp.now(),
        })

          const updatedDoc = await getDoc(doc(productsRef, id));
        return {...(updatedDoc.data() as IProductDb), id: updatedDoc .id};
    } catch (error) {
        throw Error("Failed to update Product! Please try again.");
    }
   
}

//get all products for select
 export const getAllProducts = async() => {
    const productsDocRef = await getDocs(query(productsRef));
    const products = productsDocRef.docs.map((c)=>{
        const data = c.data() as IProductDoc;
        return {
            slug: data.slug,
            name: data.name,
            id:c.id,
        }
    });
    return {data:products};
 };

//get all products for list Product with pagination, search, order
 export const getProducts = async (
  data: IGetDataInput
): Promise<IPaginationRes<IProductDb>> => {
  const {
    keyword,
    orderField = "created_at",
    orderType = "desc",
    page = 1,
    size = 5,
  } = data;

  const pageNumber = Number(page);
  const pageSize = Number(size);

  // =====================
  // BUILD QUERY
  // =====================
  const constraints: QueryConstraint[] = [];

  // 👉 SEARCH
  if (keyword) {
     constraints.push(orderBy("name", orderType));

  if (orderType === "asc") {
    constraints.push(startAt(keyword));
    constraints.push(endAt(keyword + "\uf8ff"));
  } else {
    constraints.push(startAt(keyword + "\uf8ff"));
    constraints.push(endAt(keyword));
  }
  } else {
    constraints.push(orderBy(orderField, orderType));
  }

  // =====================
  // PAGINATION
  // =====================
  if (pageNumber > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(productsRef, ...constraints),
      pageNumber,
      pageSize
    );

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
  }

  // =====================
  // GET DATA
  // =====================
  const snapshot = await getDocs(
    query(productsRef, ...constraints, limit(pageSize))
  );

  const products = serializeDocs<IProductDb>(snapshot.docs);

  // =====================
  // COUNT TOTAL (ignore pagination but apply search)
  // =====================
  const countConstraints: QueryConstraint[] = [];

  if (keyword) {
    countConstraints.push(orderBy("name"));
    countConstraints.push(startAt(keyword));
    countConstraints.push(endAt(keyword + "\uf8ff"));
  }

  const totalSnap = await getCountFromServer(
    query(productsRef, ...countConstraints)
  );
  return {
    meta: {
      total: totalSnap.data().count,
    },
    data: products,
  };
};