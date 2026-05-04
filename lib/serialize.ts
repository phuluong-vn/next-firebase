// lib/serialize.ts
import { DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export type Serialized<T> =
  T extends Timestamp
    ? string
    : T extends Date
    ? string
    : T extends Array<infer U>
    ? Serialized<U>[]
    : T extends object
    ? { [K in keyof T]: Serialized<T[K]> }
    : T;

export function serializeValue<T>(value: T): Serialized<T> {
  // Timestamp
  if (value instanceof Timestamp) {
    return value.toDate().toISOString() as Serialized<T>;
  }

  // Date
  if (value instanceof Date) {
    return value.toISOString() as Serialized<T>;
  }

  // Array
  if (Array.isArray(value)) {
    return value.map((v) => serializeValue(v)) as Serialized<T>;
  }

  // Object
  if (value !== null && typeof value === "object") {
    const result: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      result[key] = serializeValue(val);
    }

    return result as Serialized<T>;
  }

  return value as Serialized<T>;
}

//serialize 1 document
export function serializeSingleDoc<T>(
  snapshot: DocumentSnapshot
): (Serialized<T> & { id: string }) | null {
  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...serializeValue(snapshot.data() as T),
  };
}

//serialize multiple documents
export function serializeDocs<T>(
  docs: QueryDocumentSnapshot[]
): (Serialized<T> & { id: string })[] {
  return docs.map((doc) => ({
    id: doc.id,
    ...serializeValue(doc.data() as T),
  }));
}