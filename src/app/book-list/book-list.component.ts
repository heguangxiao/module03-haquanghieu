import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];
  @Input() book: Book;
  message: string;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const updateBooks = this.bookService.getList();
    updateBooks.subscribe(newList => {
      this.books = newList;
    }, error => {
      this.message = error.message;
    });
  }

  editBook(id: number) {
    this.router.navigate(['edit', id]);
  }

  deleteBook(id: number) {
    this.router.navigate(['delete', id]);
  }

}
