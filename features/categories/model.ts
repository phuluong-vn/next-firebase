import { addDoc, collection, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, startAt, Timestamp, where } from "firebase/firestore";
import { CategorySchema } from "./rule";
import { ICategoryDb, ICategoryDoc, ICreateCategoryInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/commons/queries";

const categoriesRef = collection(db,COLLECTION.CATEGORY);

export const getCategoryBySlug = async (slug: string) =>{
    const existedCategory = await getDocs(query(categoriesRef, where ("slug","==",slug)));
    if(!existedCategory.docs[0])
        return undefined;
    const category = existedCategory.docs[0].data() as ICategoryDoc;

    return {
        ...category,
        id: existedCategory.docs[0].id
    }
}

export const AddCategory = async(data: ICreateCategoryInput):Promise<ICategoryDb> =>{
    const validate = await CategorySchema.safeParse(data);
    if(!validate.success)
    {
        throw new Error(validate.error.issues[0].message);
    }
    const existedCategory = await getCategoryBySlug(data.slug);
    if(existedCategory)
    {
        throw new Error("Slug have been used!");
    }
    const newCateRef = await addDoc(categoriesRef,{
        ...data,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
    })

    const newCategory = await getDoc(newCateRef);
    return {...(newCategory.data() as ICategoryDb), id: newCateRef.id};
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

 export const getCategories = async(data: IGetDataInput):Promise<IPaginationRes<ICategoryDb>> =>{

    const {keyword, page = 1,size = 5, orderField, orderType,} = data;
    const constraints: QueryConstraint[] = [];

  // 🔹 ORDER
  constraints.push(orderBy(orderField, orderType));

  // 🔹 SEARCH (prefix search)
  if (keyword) {
    constraints.push(orderBy("name"));
    constraints.push(startAt(keyword));
    constraints.push(endAt(keyword + "\uf8ff"));
  }

  // 🔹 PAGINATION
  if (page > 1) {
    const lastDoc = await getLastVisibleDoc(
      query(categoriesRef, ...constraints),
      page,
      size
    );

    if (lastDoc) {
      constraints.push(startAfter(lastDoc));
    }
  }

  // 🔹 GET DATA
  const snapshot = await getDocs(
    query(categoriesRef, ...constraints, limit(size))
  );

  const categories = snapshot.docs.map((d) => ({
    ...(d.data() as ICategoryDoc),
    id: d.id,
  }));

  // 🔹 COUNT (phải giống filter, bỏ pagination)
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
    meta: { total: totalSnap.data().count },
    data: categories,
  };
 }

