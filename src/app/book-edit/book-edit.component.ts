import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  message: string;
  book: Book;
  constructor(private bookService: BookService, private routes: ActivatedRoute, private  router: Router) { }

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

  editBook(bookForm) {
    this.bookService.edit(this.book.id, bookForm.value).subscribe(next => {
      this.message = 'update successful';
    }, error => {
      this.message = 'update fail!';
    });
  }
  back() {
    this.router.navigate(['list']);
  }
}
