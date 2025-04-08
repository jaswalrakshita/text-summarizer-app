import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextSummarizerComponent } from './text-summarizer/text-summarizer.component'; // Import the component


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextSummarizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'text-summarizer-app';
}
