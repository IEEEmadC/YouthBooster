import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { TrimHtmlPipe } from './trim-html.pipe';
import { TruncatePipe } from './truncate.pipe';
@NgModule({
	declarations: [SearchPipe,TruncatePipe,TrimHtmlPipe],
	imports: [],
	exports: [SearchPipe,TruncatePipe,TrimHtmlPipe]
})
export class PipesModule {}
