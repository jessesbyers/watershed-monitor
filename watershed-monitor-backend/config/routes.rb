Rails.application.routes.draw do

  resources :categories, only: [:index, :show]
  
  resources :observations, only: [:new, :create, :index, :show, :destroy]

end
