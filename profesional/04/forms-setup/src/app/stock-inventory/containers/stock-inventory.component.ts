import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item, Product} from '../models/product.interface';
import {StockInventoryService} from '../services/stock-inventory.service';
import {forkJoin, Observable} from 'rxjs';
import {StockValidators} from './stock-inventory.validators';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'stock-inventory',
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency:'USD':true }}
        </div>


        <div class="stock-inventory__buttons">
          <button
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

        <pre>{{ form.value | json }}</pre>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit{

  products: Product[];

  total: number;

  productMap: Map<number, Product>;

  constructor(private fb: FormBuilder,
              private stockService: StockInventoryService) {
  }

  ngOnInit(): void {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    // Observable.forkJoin(cart, products)  DEPRECADO
    //   .subscribe( ()=>{
    //
    //   });

    //DEPRECADO Y PRONTO A SALIR
    forkJoin(cart, products).subscribe( ( [cart, products]: [Item[], Product[]]) => {
      const myMap = products.map<[number, Product]>(product => [product.id, product]);

      this.productMap = new Map<number, Product>(myMap);
      this.products = products;
      cart.forEach(item => this.addStock(item));

      this.calculeTotal(this.form.get('stock').value);
      this.form.get('stock').valueChanges.subscribe(
        value => this.calculeTotal(value));

    });

  }
  form = this.fb.group({
    store: this.fb.group({
      branch: [
        '',
        [Validators.required, StockValidators.checkBranch],
        [this.validateBranch.bind(this)]
      ],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  }, { validator: StockValidators.checkStockExists });

  onSubmit() {
    console.log('Submit: ', this.form.value);
  }

  validateBranch(control: AbstractControl){

    let valor = this.stockService.checkBranchId(control.value)
      .pipe(
        tap( res => console.log('Respuesta:', res)),
        map( (res: boolean) => res ? null : { unknownBranch: true } )
      );

    return valor;
  }

  private createStock(stock) {
    // return new FormGroup({
    //   product_id: new FormControl(parseInt(stock.product_id, 10) || ''),
    //   quantity: new FormControl(stock.quantity || 10)
    // })
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    })
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));

  }

  removeStock({group, index} : { group:FormGroup, index: number}){
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }


  private calculeTotal(value: Item[]) {
    const total = value.reduce( (prev, next) => {
      return prev + (next.quantity * this.productMap.get(next.product_id).price);
    }, 0);
    this.total = total;
  }
}
