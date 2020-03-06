Rails.application.routes.draw do


  resources :categories, only: [:index, :show]
  # get '/categories', to: 'categories#index'
  # get '/categories/:id', to: 'categories#show'



 resources :observations, only: [:new, :create, :index, :show, :destroy]
  #  get '/observations', to: 'observations#index'
  # get '/observations/:id', to: 'observations#show'
  


end
