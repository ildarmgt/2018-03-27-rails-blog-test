class BlogsController < ApplicationController
  
  # listing all blogs
  def index
    @all_blogs = Blog.all
  end

  # creating a new blog needs object for form
  def new
    @new_blog = Blog.new
  end

  # creating a new blog action
  def create
    
    new_blog = current_user.blogs.build(blog_params)
    
    if new_blog.save
      redirect_to blogs_path
    else
      render new_blog_path
    end

  end

  def show
    page_user_id = params[:id]
    
    @page_user = User.find_by_id(page_user_id)


  end

private

  def blog_params
    params.require(:blog).permit(:content, :user_id)
  end

end
