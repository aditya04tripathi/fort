import { Controller, Get, Param, Query } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import type {
	GetHashtagPostsDto,
	GetTrendingHashtagsDto,
	SearchHashtagsDto,
} from './dto';

@Controller('hashtag')
export class HashtagController {
	constructor(private readonly hashtagService: HashtagService) {}

	@Get('search')
	searchHashtags(@Query() query: SearchHashtagsDto) {
		return this.hashtagService.searchHashtags(query);
	}

	@Get('trending')
	getTrendingHashtags(@Query() query: GetTrendingHashtagsDto) {
		return this.hashtagService.getTrendingHashtags(query);
	}

	@Get(':hashtag')
	getHashtag(@Param('hashtag') hashtag: string) {
		return this.hashtagService.getHashtag(hashtag);
	}

	@Get(':hashtag/posts')
	getHashtagPosts(@Query() query: GetHashtagPostsDto) {
		return this.hashtagService.getHashtagPosts(query);
	}
}
