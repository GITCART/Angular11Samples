import {NgModule} from '@angular/core';
import {StockInventoryComponent} from './containers/stock-inventory.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {StockBranchComponent} from './components/stock-branch/stock-branch.component';
import {StockSelectorComponent} from './components/stock-selector/stock-selector.component';
import {StockProductsComponent} from './components/stock-products/stock-products.component';
import {HttpClientModule} from '@angular/common/http';
import {StockInventoryService} from './services/stock-inventory.service';
import {StockCounterComponent} from './components/stock-counter/stock-counter.component';


@NgModule({
  declarations: [
    StockInventoryComponent,
    StockBranchComponent,
    StockSelectorComponent,
    StockProductsComponent,
    StockCounterComponent

  ],
  providers:[
    StockInventoryService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    StockInventoryComponent
  ],

})
export class StockInventoryModule {
}
