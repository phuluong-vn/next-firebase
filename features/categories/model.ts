import { addDoc, collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
import { CategorySchema } from "./rule";
import { ICategoryDb, ICategoryDoc, ICategoryInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/commons/queries";
import { normalizeSlug } from "@/utils/commons/slug";

const categoriesRef = collection(db,COLLECTION.CATEGORY);


export const getCategoryBySlug = async (slug: string) =>{
    const normalizedSlug = normalizeSlug(slug);
     const snapshot = await getDocs(
    query(
      categoriesRef,
      where("slug", "==", normalizedSlug),
      limit(1)
    )
  );
  if (snapshot.empty) return undefined;

  const doc = snapshot.docs[0];

  return {
    ...(doc.data() as ICategoryDoc),
    id: doc.id,
  };
}


export const getCategoryById = async (id: string) =>{
  if (!id) throw new Error("Invalid ID"); 
  const existedCategory  = await getDoc(doc(categoriesRef, id));
  if (!(existedCategory).exists) return undefined;
  const category = existedCategory.data() as ICategoryDoc;
  return {
    ...category,
    id: existedCategory.id,
  };
}

export const deleteCategoryById = async (id: string) =>{
  if (!id) throw new Error("Invalid ID"); 
  return await deleteDoc(doc(categoriesRef, id));
}

export const addCategory = async(data: ICategoryInput):Promise<ICategoryDb> =>{
    const validate = await CategorySchema.safeParse(data);
    if(!validate.success)
    {
        throw Error(validate.error.issues[0].message);
    }
    const slug = normalizeSlug(data.slug);
    const existedCategory = await getCategoryBySlug(slug);
    console.log(data);
    if(existedCategory)
    {
        throw Error("Slug have been used!");
    }
    const newCateRef = await addDoc(categoriesRef,{
        ...data,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
    })

    const newCategory = await getDoc(newCateRef);
    return {...(newCategory.data() as ICategoryDb), id: newCateRef.id};
}

export const editCategory = async(id: string, data: ICategoryInput):Promise<ICategoryDb> =>{
  const category = await getCategoryById(id);
  if(!category)
  {
    throw Error("Category not found!");
  }  
  const validate = await CategorySchema.safeParse(data);
    if(!validate.success)
    {
        throw Error(validate.error.issues[0].message);
    }
    const slug = normalizeSlug(data.slug);
    const existedCategory = await getCategoryBySlug(slug);
    console.log(data);
    if(existedCategory && existedCategory.id !== id)
    {
        throw Error("Slug have been used!");
    }
    try {
        await updateDoc(doc(categoriesRef, id), {
            ...data,
            updated_at: Timestamp.now(),
        })

          const updatedDoc = await getDoc(doc(categoriesRef, id));
        return {...(updatedDoc.data() as ICategoryDb), id: updatedDoc .id};
    } catch (error) {
        throw Error("Failed to update category! Please try again.");
    }
   
}

//get all categories for select
 export const getAllCategories = async() => {
    const categoriesDocRef = await getDocs(query(categoriesRef));
    const categories = categoriesDocRef.docs.map((c)=>{
        const data = c.data() as ICategoryDoc;
        return {
            slug: data.slug,
            name: data.name,
            id:c.id,
        }
    });
    return {data:categories};
 };

//get all categories for list category with pagination, search, order
 export const getCategories = async (
  data: IGetDataInput
): Promise<IPaginationRes<ICategoryDb>> => {
  const {
    keyword,
    orderField = "name",
    orderType = "asc",
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
      query(categoriesRef, ...constraints),
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
    query(categoriesRef, ...constraints, limit(pageSize))
  );

  const categories = snapshot.docs.map((doc) => ({
    ...(doc.data() as ICategoryDoc),
    id: doc.id,
  }));

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
    query(categoriesRef, ...countConstraints)
  );
  return {
    meta: {
      total: totalSnap.data().count,
    },
    data: categories,
  };
};