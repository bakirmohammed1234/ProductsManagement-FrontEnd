import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  products!:any[];
  errorMessage: string='';

  //chercher
 searchFormGroup!: FormGroup;

 //pagination
 currentPage:number=0;
 totalPages:number=0;
 pageSize:number=5;

 currentAction:string="all";
 constructor( private productService:ProductService, private fb: FormBuilder ){


 }

 ngOnInit(): void {
  this.searchFormGroup=this.fb.group(
    { keyword: this.fb.control(null)

    });
//  this.handleGetAllProducts();
 this.handleGetPageProducts();
}

handleGetPageProducts(){
  this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
    next: (data)=>{
      console.log(data.totalPages);
          this.products=data.products;
          this.totalPages=data.totalPages;
    }
  })
}
handleGetAllProducts(){
 this.productService.getAllProducts().subscribe(
    { next: (data)=>{
      this.products=data;
    },
  error: (err)=>{
      this.errorMessage=err;
  }}
  );
}

handleDeleteProduct(p:any){

this.productService.deleteProduct(p.id).subscribe(
  {
    next: (data)=>{
      let index=this.products.indexOf(p);
      this.products.splice(index,1);
    },
    error: (err)=>{
      this.errorMessage=err;
    }
  }
)
}

handleSetPromotion(p:any){
  let promo=p.promotion;
  this.productService.setPromotion(p.id).subscribe(
    {
      next: (data)=>{
        p.promotion=!promo;
      },
      error: (err)=>{
        this.errorMessage=err;
      }
    }
  )

}

handleSearchProducts(){
  this.currentAction="search";
  this.currentPage=0;
   let keyword=this.searchFormGroup.value.keyword;
   this.productService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe(
    { next: (data)=>{

      this.products=data.products;
      this.totalPages=data.totalPages;
    },
    error: (err)=>{

    }
  }
   )
}

goToPage(i:number){


   this.currentPage=i;
   if(this.currentAction==="all"){
   this.handleGetPageProducts();
   }else{
    this.handleSearchProducts();
   }


}

}
