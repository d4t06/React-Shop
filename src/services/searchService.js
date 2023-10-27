import { sleep } from "@/utils/appHelper";
import request from "@/utils/request";


export const searchService = async (query) => {
   // phai xu li sort
   const {sort, ...rest} = query

    try { 
        const response = await request.get(`products/search`, {
           params: {
            ...rest,
            ...sort
           }
        });
        console.log("searchService = ", response.data)
      //   await sleep(1000);
        return response.data;
     } catch (error) {
        console.log(">>> searchService", error);
     }
}

export default searchService