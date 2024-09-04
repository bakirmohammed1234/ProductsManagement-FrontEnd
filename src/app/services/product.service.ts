import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product.module';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  constructor() {
    this.products=[
      {id:UUID.UUID(),name: 'computer', price:2000,promotion: true},
      {id:UUID.UUID(),name: 'printer', price:8002,promotion:false},
      {id:UUID.UUID(),name: 'smart phone', price:3000, promotion:true},
     ];
     for(let i=0; i<10;i++){
       this.products.push({id:UUID.UUID(),name: 'computer', price:2000,promotion: true});
       this.products.push( {id:UUID.UUID(),name: 'printer', price:8002,promotion:false});
       this.products.push({id:UUID.UUID(),name: 'smart phone', price:3000, promotion:true});
     }
   }

   public getAllProducts(): Observable<Product[]>{

      return of(this.products);

   }

   public deleteProduct(id: string): Observable<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);

    if (this.products.length < initialLength) {
        // console.log(this.products);
        return of(true);
    } else {
        return throwError(() => new Error("Object not found"));
    }
}
public setPromotion(id:string):Observable<boolean>{

  let product=this.products.find(p=>p.id==id);
  if(product!=undefined){
    product.promotion=!product.promotion;
    return of(true);
  }
  else{
    return throwError(()=>new Error("product not found"));
  }
}

public searchProducts( keyword: string,page:number,size:number): Observable<PageProduct>{
  const result: Product[]=this.products.filter( p=>p.name.includes(keyword));
  let index= page*size;

   let totalPages= ~~(result.length/size);
   if(this.products.length%size!=0){
    totalPages++;
  }
  let pageProducts=result.slice(index,index+size);

  return of({ page: page, size: size, totalPages: totalPages, products: pageProducts });
}

public getPageProducts(page: number, size: number):Observable<PageProduct>{
  let index= page*size;

   let totalPages= ~~(this.products.length/size);
   if(this.products.length%size!=0){
    totalPages++;
  }
  let pageProducts=this.products.slice(index,index+size);
  return of({ page: page, size: size, totalPages: totalPages, products: pageProducts });


}
}
