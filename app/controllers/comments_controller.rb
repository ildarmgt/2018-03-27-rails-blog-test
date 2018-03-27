class CommentsController < ApplicationController
  def new
    # @new_comment = Comment.new
  end

  
  def create
    
    new_comment = current_user.comments.build(comment_params)    

    if (comment_params[:content] != "")
      if new_comment.save
        redirect_back(fallback_location: root_path)
        flash[:notice] = "New comment published!"
      else
        redirect_back(fallback_location: root_path)
        flash[:alert] = "Error: Failed to publish, try again!"
      end
    else
      flash[:alert] = "Error: Content can't be blank!"
      redirect_back(fallback_location: root_path)
    end

  end

  def destroy
    @target_comment = Comment.find_by_id(params[:id])
    @target_comment.destroy
    flash[:notice] = 'Your comment was removed!'
    # redirect_to root_path
    redirect_back(fallback_location: root_path)
  end

  def update
    updated_comment = Comment.find_by_id(params[:id])

    if (comment_params[:content] != "")

      if updated_comment.update(comment_params)
        flash[:notice] = 'Your comment was updated successfully!'
        redirect_back(fallback_location: root_path)
      else
        flash[:alert] = 'Error: Comment not updated, try again!'
        redirect_back(fallback_location: root_path)
      end

    else
      flash[:alert] = "Error: Content can't be blank!"
      redirect_back(fallback_location: root_path)
    end
  end

private

  def comment_params
    params.require(:comment).permit(:content, :user_id, :blog_id)
  end

end
