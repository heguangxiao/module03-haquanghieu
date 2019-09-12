import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  message: string;
  book: Book;

  constructor(private bookService: BookService, private router: Router, private routes: ActivatedRoute) { }

  ngOnInit() {
    this.routes.paramMap.subscribe((param: ParamMap) => {
      const id = parseInt(param.get('id'), 10);
      this.bookService.getDetail(id).subscribe(next => {
        this.book = next;
      }, error => {
        this.message = 'can not retrieve book detail. ' + error;
      });
    });
  }

  index() {
    this.router.navigate(['list']);
  }
}
