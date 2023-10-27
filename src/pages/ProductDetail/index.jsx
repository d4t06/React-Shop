import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailItem } from "@/components";
import * as productServices from "../../services/productServices";

function DetailPage() {
   const { category, key } = useParams();
   const [product, setProduct] = useState("");
   const [status, setStatus] = useState("loading");
   const useEffectRan = useRef(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await productServices.getProductDetail({category, href:key});

            console.log('check res', response);
            if (response[0].detail_data[0]) {
               setProduct(response);
               setStatus("finish");
            } else {
               setStatus("error");
            }
         } catch (error) {
            setStatus("error");
         }
      };
      fetchData();


   }, [key]);

   if (status === "loading") return <h1>...</h1>;
   if (status === "error") return <h1>Some thing went wrong</h1>;

   return <div><ProductDetailItem data={product[0]} /></div> ;
}
export default DetailPage;
