Rails.application.routes.draw do
  devise_for :users
  
  get '/users/:id', to: 'users#show', as: 'user'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  
  resources :blogs
  resources :comments
  root to: "blogs#index"
end
