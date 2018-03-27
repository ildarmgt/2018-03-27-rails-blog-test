Rails.application.routes.draw do
  devise_for :users
  
  # get '/users/:id/', to: 'users#show', as: 'user'
  

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users
  resources :blogs
  resources :comments
  # root to: "blogs#landing"

  devise_scope :user do
    authenticated :user do
      # root :to => "users#show", :id => current_user.id
      # root to: "users#show"
      root to: "users#findpage"
    end

    unauthenticated do
      root :to => "users#landing"
    end
  end


end
