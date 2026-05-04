//model.ts is used to implement basic CRUD operations and handle communication with the database.

import { addDoc, collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
import {  IAdminDB, IAdminDoc, IAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { hashPassword } from "@/utils/commons/password";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/commons/queries";
import { serializeDocs } from "@/lib/serialize";

const adminRef = collection(db,COLLECTION.ADMIN);

export const findAdminByEmail = async (email:string) : Promise<IAdminDB | undefined> =>{
    const existAdmin = await getDocs(query(adminRef, where("email","==", email)));

    if(!existAdmin.docs[0])
    {
        return undefined;
    }
    const admin = existAdmin.docs[0].data() as IAdminDB
    return {
        ...admin,
         id: existAdmin.docs[0].id
    }
} 

export const deleteManagerById = async (id: string) =>{
  if (!id) throw new Error("Invalid ID"); 
  return await deleteDoc(doc(adminRef, id));
}
export const createAdmin = async (data: IAdminInput)=>{
    const existEmail = await findAdminByEmail(data.email);
    if(existEmail)
    {
        throw Error('Email is existed')
    }

    const hashedPassword = await hashPassword(data.password);

    const newAdminRef = await addDoc(adminRef, 
        {
            email: data.email,
            password: hashedPassword,
            isActive: true,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        });

    const newAdmin = await getDoc(newAdminRef);

    return {id: newAdmin.id, ...newAdmin.data()}
}

export const updateActiveAdmin = async (id: string, isActive: boolean) => {
  await updateDoc(doc(adminRef, id), {
    isActive,
  });

  const newCategory = await getDoc(doc(adminRef, id));

  return { id: newCategory.id, ...(newCategory.data() as IAdminDoc) };
};


//get all categories for list category with pagination, search, order
 export const getManagers = async (
  data: IGetDataInput
): Promise<IPaginationRes<IAdminDB>> => {
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
     constraints.push(orderBy("email", orderType));

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
      query(adminRef, ...constraints),
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
      query(adminRef, ...constraints, limit(pageSize))
    );
  console.log("snapshot", snapshot.docs);
    const managers = serializeDocs<IAdminDB>(snapshot.docs);
    console.log("managers", managers);
  
    // =====================
    // COUNT TOTAL (ignore pagination but apply search)
    // =====================
    const countConstraints: QueryConstraint[] = [];
  
    if (keyword) {
      countConstraints.push(orderBy("created_at"));
      countConstraints.push(startAt(keyword));
      countConstraints.push(endAt(keyword + "\uf8ff"));
    }
  
    const totalSnap = await getCountFromServer(
      query(adminRef, ...countConstraints)
    );
    return {
      meta: {
        total: totalSnap.data().count,
      },
      data: managers,
    };
  };


