//model.ts is used to implement basic CRUD operations and handle communication with the database.

import { addDoc, collection, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import {  IAdminDB, ICreateAdminInput } from "./type";
import { db } from "@/utils/firebase";
import { COLLECTION } from "@/constants/commons";
import { hashPassword } from "@/utils/commons/password";

const adminRef = collection(db,COLLECTION.ADMIN);

export const findAdminByEmail = async (email:string) : Promise<IAdminDB> =>{
    const existAdmin = await getDocs(query(adminRef, where("email","==", email)));

    if(!existAdmin.docs[0])
    {
        throw Error("Email is not exist!");
    }
    const admin = existAdmin.docs[0].data() as IAdminDB
    return {
        ...admin,
         id: existAdmin.docs[0].id
    }
} 

export const createAdmin = async (data: ICreateAdminInput)=>{
    
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
            created_at: Timestamp.now(),
            update_at: Timestamp.now(),
        });

    const newAdmin = await getDoc(newAdminRef);

    return {id: newAdmin.id, ...newAdmin.data()}
}

