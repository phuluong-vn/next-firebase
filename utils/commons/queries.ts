import { getDocs, limit, query, Query } from "firebase/firestore";

export const getLastVisibleDoc = async(
    queryRef: Query,
    page: number,
    size: number
) =>{
    const docFormStart = await getDocs(query(queryRef,limit((page-1) *size)));
    const lastDoc = docFormStart.docs[docFormStart.docs.length -1 ];
    return lastDoc;
}