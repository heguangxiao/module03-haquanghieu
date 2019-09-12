import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.scss']
})
export class BookDeleteComponent implements OnInit {

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

  back() {
    this.router.navigate(['list']);
  }

  deleteBook(id: number){
    this.bookService.delete(id).subscribe(() => {
      this.message = 'Successfully deleted';
      this.router.navigate(['list']);
    }, error => {
      this.message = 'Failed when deleting customer with id = ' + id;
    });
  }

}
