import { Component } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environments';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-text-summarizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-summarizer.component.html',
  styleUrls: ['./text-summarizer.component.css']
})
export class TextSummarizerComponent {
  inputText: string = '';
  summary: string = '';
  loading: boolean = false;
  error: string = '';

  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    // this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' }); // Or another model
  }

  async summarizeText() {
    if (!this.inputText.trim()) {
      this.error = 'Please enter text to summarize.';
      return;
    }
    this.error = '';
    this.loading = true;
    this.summary = '';

    try {
      const result = await this.model.generateContent(`Summarize the following text: ${this.inputText}`);
      const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        this.summary = text;
      } else {
        this.summary = 'No summary received.';
      }
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      this.error = `Failed to generate summary: ${error.message}`;
    } finally {
      this.loading = false;
    }
  }
}
