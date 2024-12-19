import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {addPost} from '../storage/post.actions';
import {Router} from '@angular/router';
import {GoBackComponent} from '../go-back/go-back.component';

@Component({
  selector: 'app-post-new',
  imports: [ReactiveFormsModule, GoBackComponent],
  templateUrl: './post-new.component.html',
  styleUrl: './post-new.component.css'
})
export class PostNewComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  createPost() {
    if (this.postForm.valid) {
      this.store.dispatch(addPost(this.postForm.value));
    }
    this.router.navigate(['/']);
  }
}
