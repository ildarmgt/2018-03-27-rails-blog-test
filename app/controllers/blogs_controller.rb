class BlogsController < ApplicationController
  
  # listing all blogs
  def index
    @all_blogs = Blog.all
  end

  # creating a new blog needs object for form
  def new
    # @new_blog = Blog.new
  end

  # creating a new blog action
  def create
    
    new_blog = current_user.blogs.build(blog_params)

    if (blog_params[:content] != "")
      if new_blog.save
        
        redirect_back(fallback_location: root_path)
        flash[:notice] = "New blog published!"

      else
        redirect_back(fallback_location: root_path)
        flash[:alert] = "Error: Failed to publish, try again!"
      end
    else
      flash[:alert] = "Error: Content can't be blank!"
      redirect_back(fallback_location: root_path)
    end

  end

  def update
    updated_blog = Blog.find_by_id(params[:id])

    if (blog_params[:content] != "")
      if updated_blog.update(blog_params)
        flash[:notice] = 'Your blog was updated successfully!'
        redirect_back(fallback_location: root_path)
      else
        flash[:alert] = 'Error: Blog not updated, try again!'
        redirect_back(fallback_location: root_path)
      end
    else
      flash[:alert] = "Error: Content can't be blank!"
      redirect_back(fallback_location: root_path)
    end

  end
  
  def show
    @page_blog_id = params[:id]  # this is for current blog
    # current_user for current logged in user

    @page_blog = Blog.find_by_id(@page_blog_id)

    
  end

  def destroy
    blog = Blog.find_by_id(params[:id])
    blog.destroy
    flash[:notice] = 'Your blog was removed!'
    # redirect_to root_path
    redirect_back(fallback_location: root_path)
    
  end



private

  def blog_params
    params.require(:blog).permit(:content, :user_id)
  end

end
