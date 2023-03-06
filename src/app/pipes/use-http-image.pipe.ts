import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { SafeCall } from '@angular/compiler';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'useHttpImage'
})
export class UseHttpImagePipe implements PipeTransform {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  transform(url: string): Observable<SafeUrl> {
    return this.http
      .get(url, { responseType: 'blob' })
      .pipe(map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val))));

  }

}
