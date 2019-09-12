import { Component, OnInit } from '@angular/core';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  message: string;
  constructor(private bookService: BookService) { }

  ngOnInit() {
  }
  createBook(bookForm) {
    this.bookService.add(bookForm.value).subscribe( () => {
      this.message = 'Successfully created';
    }, error => {
      this.message = 'Error when creating book';
    });
  }

}
