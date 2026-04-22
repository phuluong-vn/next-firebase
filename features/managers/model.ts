//model.ts is used to implement basic CRUD operations and handle communication with the database.

import { addDoc, collection, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import {  ICreateAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { hashPassword } from "@/utils/commons/password";

export const createAdmin = async (data: ICreateAdminInput)=>{
    const adminRef = collection(db,COLLECTION.ADMIN);

    const existEmail = await getDocs(query(adminRef, where("email","==", data.email)));
    if(existEmail.docs.length)
    {
        throw Error('Email is existed')
    }

    const hashedPassword = await hashPassword(data.password);

    const newAdminRef = await addDoc(adminRef, 
        {
            email: data.email,
            password: hashedPassword,
            created_at: Timestamp.now(),
            update_at: Timestamp.now(),
        });

    const newAdmin = await getDoc(newAdminRef);

    return {id: newAdmin.id, ...newAdmin.data()}

}