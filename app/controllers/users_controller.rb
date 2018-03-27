class UsersController < ApplicationController

  def index
  end
  
  def show
    @page_user_id = (params[:id] || current_user.id).to_i
    
    @page_user = User.find_by_id(@page_user_id)

    # @page_user = User.find_by_id(@page_user_id)


    # if user for this page doesn't exist
    if !@page_user
      render '/users/notfound.html'
      # render '/users/notfound.html'
      # redirect_to 'users/' + current_user.id.to_s
    end

    
  end


  def findpage
    # this makes sure url has full path
    redirect_to user_path(current_user.id)
  end

end
