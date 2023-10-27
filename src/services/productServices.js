import request from "@/utils/request";

export const getProducts = async (querys) => {
   // console.log("service querys", querys)
   if (!querys) {
      console.log("product service missing query");
      return []
   }

   const {filters, sort, category, ...rest} = querys
   try {
      const response = await request.get(`/products/${category}`, {
         params: {
            ...rest,
            // ...filters, //brand='samsung,iphone'
            brand_name: filters.brand,
            price: filters.price,
            ...sort //column=cur_price&type=asc
         }
      })
      return response.data
   } catch (error) {
      console.log("loi getProducts services", error);
   }
};

export const getProductDetail = async (querys) => {
   if (!querys) {
      console.log("product service missing query");
      return;
   }
   const {category, href} = querys
   try {
      const response = await request.get(`/products/${category}/${href}`, {
         params: {
         }
      })
      return response.data
   } catch (error) {
      console.log("loi getProductDetail services", error);
   }
};

export const buyProduct = async (data) => {
   if (!data) {
      console.log("data missing !");
      return
   }
   try {
      request.post('/products', {
         body: {
            ...data
         }
      })
   } catch (error) {
      console.log('buy product fail, ', error)
   }
}
