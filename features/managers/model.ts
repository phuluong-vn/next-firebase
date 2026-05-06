//model.ts is used to implement basic CRUD operations and handle communication with the database.

import { addDoc, collection, deleteDoc, doc, endAt, getCountFromServer, getDoc, getDocs, limit, orderBy, query, QueryConstraint, startAfter, startAt, Timestamp, updateDoc, where } from "firebase/firestore";
import {  IAdminDb, IAdminDoc, IAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { hashPassword } from "@/utils/commons/password";
import { IGetDataInput, IPaginationRes } from "../type";
import { getLastVisibleDoc } from "@/utils/commons/queries";
import { serializeDocs } from "@/lib/serialize";

const adminRef = collection(db,COLLECTION.ADMIN);

export const findAdminByEmail = async (email:string) : Promise<IAdminDb | undefined> =>{
    const existAdmin = await getDocs(query(adminRef, where("email","==", email)));

    if(!existAdmin.docs[0])
    {
        return undefined;
    }
    const admin = existAdmin.docs[0].data() as IAdminDb
    return {
        ...admin,
         id: existAdmin.docs[0].id
    }
} 

export const getManagerById = async (id: string) => {
  const existedManager = await getDoc(doc(adminRef, id));

  if (!existedManager) {
    return undefined;
  }

  const category = existedManager.data() as IAdminDoc;

  return {
    ...category,
    id: existedManager.id,
  };
};

export const deleteManagerById = async (id: string) => {
  if (!id || typeof id !== 'string' || id.trim() === '') {
    throw new Error("Manager ID is required and must be a valid string");
  }

  try {
    // Check if manager exists before deleting
    const managerDoc = await getDoc(doc(adminRef, id));
    if (!managerDoc.exists()) {
      throw new Error("Manager not found");
    }

    // Delete the manager
    await deleteDoc(doc(adminRef, id));

    return { success: true, message: "Manager deleted successfully" };
  } catch (error) {
    console.error("Error deleting manager:", error);
    throw error;
  }
}

export const deleteManagersByIds = async (ids: string[]) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error("Manager IDs array is required and cannot be empty");
  }

  const results = [];

  for (const id of ids) {
    try {
      await deleteManagerById(id);
      results.push({ id, success: true });
    } catch (error) {
      throw error;
    }
  }

  
}

export const deleteInactiveManagers = async () => {
  try {
    // Get all inactive managers
    const inactiveManagersQuery = query(adminRef, where("isActive", "==", false));
    const snapshot = await getDocs(inactiveManagersQuery);

    if (snapshot.empty) {
      return { success: true, message: "No inactive managers found", deleted: 0 };
    }

    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    return {
      success: true,
      message: `${snapshot.docs.length} inactive managers deleted successfully`,
      deleted: snapshot.docs.length
    };
  } catch (error) {
    console.error("Error deleting inactive managers:", error);
    throw error;
  }
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
): Promise<IPaginationRes<IAdminDb>> => {
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
    const managers = serializeDocs<IAdminDb>(snapshot.docs);
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


