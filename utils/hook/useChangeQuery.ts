import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useChangeQuery = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChangeQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
    params.set("page", "1");
  }
    replace(`${pathname}?${params.toString()}`);
  };

  const getQuery = (key: string): string => {
    return searchParams.get(key) || '';
  }
  return {
    onChangeQuery,
    getQuery,
  };
};

export default useChangeQuery;