import { Controller } from '@nestjs/common';
import { router } from '@ts-rest/example-contracts';
import {
  Api as ApiRoute,
  ApiDecorator as ApiParams,
  initNestServer,
} from '@ts-rest/nest';
import { PostService } from './post.service';

const s = initNestServer(router.posts);
type ControllerShape = typeof s.controllerShape;
type RouteShape = typeof s.routeShapes;

@Controller()
export class PostController implements ControllerShape {
  constructor(private readonly postService: PostService) {}

  @ApiRoute(s.route.getPosts)
  async getPosts(
    @ApiParams() { query: { take, skip } }: RouteShape['getPosts']
  ) {
    const posts = await this.postService.getPosts({ take, skip });

    return posts;
  }

  @ApiRoute(s.route.getPost)
  async getPost(@ApiParams() { params: { id } }: RouteShape['getPost']) {
    const post = await this.postService.getPost(id);

    return post;
  }

  @ApiRoute(s.route.createPost)
  async createPost(@ApiParams() { body }: RouteShape['createPost']) {
    const post = await this.postService.createPost({
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: body.authorId,
      description: body.description,
    });

    return post;
  }

  @ApiRoute(s.route.updatePost)
  async updatePost(
    @ApiParams() { params: { id }, body }: RouteShape['updatePost']
  ) {
    const post = await this.postService.updatePost(id, {
      title: body.title,
      content: body.content,
      published: body.published,
      description: body.description,
    });

    return post;
  }

  @ApiRoute(s.route.deletePost)
  async deletePost(@ApiParams() { params: { id } }: RouteShape['deletePost']) {
    await this.postService.deletePost(id);

    return true;
  }
}
