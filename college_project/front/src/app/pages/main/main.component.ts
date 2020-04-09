import { Component, OnInit } from "@angular/core";
import { DetailsService } from "../../service/details.service";
import { BooksdetailsService } from "../../service/booksdetails.service";
import { BestSellerService } from "../../service/best-seller.service";
import { Observable, Subscribable, Subscriber, Subscription } from "rxjs";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";
import { map, mergeMap, switchMap } from "rxjs/operators";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  book_categories$: Observable<jsonresponse>;
  randomNum: Subscription;
  randomCat: Subscription;
  randomNumber: number;
  randomCategory: string;
  book_details$: Observable<jsonresponse>;
  science_details$: Observable<jsonresponse>;

  constructor(
    private category_name: DetailsService,
    private book_name: BooksdetailsService,
    private science_book: BestSellerService
  ) {
    this.books_c();
  }

  books_c() {
    this.book_categories$ = this.category_name
      .details()
      .pipe(map((x) => x.data));
  }

  randomizeUpperBooks() {
    this.randomNum = this.category_name
      .details()
      .pipe(map((x) => Math.floor(Math.random() * x.data.length)))
      .subscribe((x) => {
        this.randomNumber = x;
      });
    this.randomCat = this.book_categories$.subscribe((y) => {
      this.randomCategory = y[this.randomNumber].category;
      this.book_d(this.randomCategory);
    });
  }

  randomizeLowerBooks() {
    this.randomNum = this.category_name
      .details()
      .pipe(map((x) => Math.floor(Math.random() * x.data.length)))
      .subscribe((x) => {
        this.randomNumber = x;
      });
    this.randomCat = this.book_categories$.subscribe((y) => {
      this.randomCategory = y[this.randomNumber].category;
      this.science(this.randomCategory);
    });
  }

  book_d(categoryName) {
    this.book_details$ = this.book_name
      .bookdetails(categoryName)
      .pipe(map((x) => x.data));
  }
  science(categoryName) {
    this.science_details$ = this.book_name
      .bookdetails(categoryName)
      .pipe(map((x) => x.data));
  }

  ngOnInit() {
    this.randomizeUpperBooks();
    this.randomizeLowerBooks();
  }
}
